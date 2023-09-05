# QuantumLab-Agent

QuantumLab Agent is a crucial component of the QuantumLab backend. It is a standalone Go program Terraform installs on a virtual compute environment (a.k.a. workspace).

## Context

After a client selects to create a new workspace in the React application, the QuantumLab Go web server will store the relevant metadata in the Workspaces table and execute a Terraform script to create a workspace (e.g., a virtual machine or a Docker container) in a Melbourne Research Cloud Instance. During the workspace creation process, Terraform installs an instance of the QuantumLab Agent in the newly created workspace.

QuantumLab Agent is a standalone Go program providing the following three primary functionalities.

First, it executes an initialisation script in the virtual compute resource to perform initialisation. If the initialisation process fails, it will report the error message to the QuantumLab server. The QuantumLab server will update the workspace status to Failed.

Second, it regularly sends heartbeat messages to the QuantumLab server to report the workspace status. If the QuantumLab server does not receive such heartbeat messages for some time, it will update the workspace status to Connecting.

## config.yaml Example

```yaml
metadata:
  url: "http://localhost:8080/api/agent"
  token: "ql_token"
workspace:
  owner: "e2c5f225-a951-4c2e-b581-5c0fc8f5f55e"
  id: "2c4478a2-d0fd-420e-a8d2-652a50e43303"
toolSet:
  - name: "vscode"
    url: "http://localhost:12000/?folder=/home/root"
    healthCheck:
      check: true
      healthCheckEndpoint: "http://localhost:12000/healthz"
      interval: 2
      threshold: 10
    config: { }
  - name: "jupyter"
    url: "http://localhost:13000"
    healthCheck:
      check: true
      healthCheckEndpoint: "http://localhost:13000/healthz"
      interval: 5
      threshold: 10
    config: { }
```

## initialisation.sh Example

```shell
#!/bin/bash
# echo -e "Hello, virtual environment!"
echo 0

# Before running QuantumLab Agent, you may need to make this test script executable.
# Run the following command from the Terminal.
# chmod +x initialisation.sh
```

## Implementation Q&A

1. How does QuantumLab Agent get the workspace ID? One solution could be to load a Virtual Machine Environment Variable WORKSPACE_ID.

   Yes. QuantumLab Agent should also know the QuantumLab token associated with the workspace's user. Every time QuantumLab Agent sends a heartbeat message, it will include the workspace ID, workspace owner, QuantumLab token, QuantumLab server URL, workspace status, and a message.

2. Will QuantumLab Agent execute the initialisation script only once?

   QuantumLab Agent can execute the initialisation script more than once since the initialisation process is ***idempotent***.

3. What is the command to execute the installation script?

   That command should be like ./initialisation.sh. We do not need to consider passing arguments to that initialisation script.

4. What does the output look like? QuantumLab Agent should depend on that to determine if the initialisation has been successful.

   If the initialisation succeeds, the initialisation script should return 0. Otherwise, QuantumLab Agent should collect relevant logs and send these to the QuantumLab server.

5. Are we assuming the virtual machine works normally if QuantumLab Agent continues sending heartbeat messages? What if the virtual machine does not function normally while QuantumLab Agent can still send heartbeat messages?

   Yes. It is our assumption.

6. Should we add one more attribute named last_verified to the Workspaces table to record the last date and time the Go web server received a heartbeat message from the corresponding QuantumLab Agent? Thus, the Go web server can regularly check if the virtual machine works normally.

   The QuantumLab server should use a map to track the status of every workspace.

7. You mentioned Terraform should configure QuantumLab Agent. Could you please explain which configuration Terraform should set?

   Terraform should record the two environment variables mentioned in Question 1 in a yaml file and copy that file to the virtual machine. Then, QuantumLab Agent will retrieve the workspace ID and QuantumLab token from that text file.