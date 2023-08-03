# QuantumLab-Agent

QuantumLab Agent is a crucial component of the QuantumLab backend.

## Context

After a client selects to create a new workspace in the React application, the QuantumLab Go web server will store the relevant metadata in the Workspaces table and execute a Terraform script to create a virtual compute resource in the physical server (e.g., a virtual machine or a Docker container). One of the actions in the Terraform script is to install an instance of the QuantumLab Agent in the newly created virtual compute resource.

QuantumLab Agent is a standalone Go program providing the following two primary functionalities. I will ignore the third one, which we will not implement during Sprint 3.

First, it executes an initialisation script in the virtual compute resource to perform initialisation. If the initialisation process fails, it will report the error message to the QuantumLab server. The QuantumLab server will update the workspace status to failed.

Second, it regularly sends heartbeat messages to the QuantumLab server to report if the virtual machine functions normally. If the QuantumLab server does not receive such heartbeat messages for some time, it will update the workspace status to connecting.

## Implementation Q&A

1. How does QuantumLab Agent get the workspace ID? One solution could be to load a Virtual Machine Environment Variable WORKSPACE_ID.

   Yes. And QuantumLab Agent should also know the QuantumLab token associated with the workspace's user. Every time QuantumLab Agent sends a heartbeat message, it will include the workspace ID, QuantumLab token, workspace status, and content.

2. Will QuantumLab Agent execute the initialisation script only once?

   QuantumLab Agent can execute the initialisation script more than once since the initialisation process is idempotent.

3. What is the command to execute the installation script?

   That command should be like ./initialisation.sh. We do not need to consider passing arguments to that initialisation script.

4. What does the output look like? QuantumLab Agent should depend on that to determine if the initialisation has been successful.

   If the initialisation succeeds, the initialisation script should return 0. Otherwise, QuantumLab Agent should collect relevant logs and send these to the QuantumLab server.

5. Are we assuming the virtual machine works normally if QuantumLab Agent continues sending heartbeat messages? What if the virtual machine does not function normally while QuantumLab Agent can still send heartbeat messages?

   Yes. It is our assumption.

6. Should we add one more attribute named last_verified to the Workspaces table to record the last date and time the Go web server received a heartbeat message from the corresponding QuantumLab Agent? Thus, the Go web server can regularly check if the virtual machine works normally.

   The QuantumLab server should use a variable to track the status of the workspace.

7. You mentioned Terraform should configure QuantumLab Agent. Could you please explain which configuration Terraform should set?

   Terraform should record the two environment variables mentioned in Question 1 in a text file and copy that file to the virtual machine. Then QuantumLab Agent will retrieve the workspace ID and QuantumLab token from that text file.