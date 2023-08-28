import {Button, Table, notification} from 'antd';
import React, {useEffect, useState} from 'react';
import InviteUsersModal from './inviteUsersModal';

type User = {
  email: string;
  uuid: string;
  id: number;
  firstName: string;
  lastName: string;
  accountStatus: number;
  accessLevel: number;
  role: string;
};


const AdminUserList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      notification.error({
        message: 'Request Timeout',
        description:
          'Fetching users took too long and is considered as failed. Please try again later.',
      });
    }, 10000); // 10 seconds timeout

    fetch('/api/admin/users')
      .then((response) => response.json())
      .then((data) => {
        clearTimeout(timeoutId);
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:', error);
        clearTimeout(timeoutId);
        setLoading(false);
        notification.error({
          message: 'Error Fetching Users',
          description: 'An error occurred while fetching the users. Please try again later.',
        });
      });

    // Cleanup timeout if component is unmounted
    return () => clearTimeout(timeoutId);
  }, []);


  const updateUserStatus = async (uuid: string, status: number) => {
    const userToUpdate = users.find((user) => user.uuid === uuid);
    if (!userToUpdate) return;

    const accessLevel = status === 1 ? userToUpdate.accessLevel : 0;
    const payload = {
      uuid,
      accountStatus: status,
      accessLevel,
    };

    const response = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // Since the backend only returns success, update the local state based on the changes made
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uuid === uuid ? {...user, accountStatus: status, accessLevel} : user,
        ),
      );

      console.log(`${uuid} updated successfully!`);
    } else {
      // Handle error here (e.g., show notification to the user)
      console.log(`${uuid} failed!!`);
    }
  };

  const setUsersStatus = async (status: number) => {
    await Promise.all(selectedRowKeys.map((uuid) => updateUserStatus(uuid, status)));
    notification.success({
      message: 'Update Successful',
      description: `Successfully updated ${selectedRowKeys.length} users.`,
    });
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys as string[]);
    },
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_: any, record: User) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'User ID',
      dataIndex: 'id',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'accountStatus',
      render: (status: number) => (status === 1 ? 'Active' : 'Inactive'),
    },
  ];


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSend = async (emails: string[]) => {
    // Constructing the payload for the request
    const payload = {
      emails,
    };

    try {
      const response = await fetch('/api/admin/users/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json(); // Assuming your server returns some JSON data
        // Handle success scenario here
        notification.success({
          message: 'Invitations Sent',
          description: data.message || 'Invitations have been sent successfully.',
        });
      } else {
        const data = await response.json(); // Extract error message from response, if any
        // Handle error scenario here
        notification.error({
          message: 'Failed to Send Invitations',
          description: data.error || 'There was an error sending the invitations.',
        });
      }
    } catch (error) {
      // Handle unexpected errors here
      notification.error({
        message: 'Network Error',
        description: 'An unexpected error occurred. Please try again later.',
      });
    }

    // Close the modal after sending the invitations
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div>
        <Button type="primary" onClick={showModal}>
          Invite New
        </Button>
        <Button
          type="primary"
          onClick={() => setUsersStatus(1)}
          disabled={!selectedRowKeys.length}
          loading={loading}
        >
          Set Active
        </Button>
        <Button
          type="primary"
          onClick={() => setUsersStatus(0)}
          disabled={!selectedRowKeys.length}
          loading={loading}
        >
          Set Inactive
        </Button>
      </div>

      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={users}
        rowKey="uuid"
        loading={loading}
      />

      <InviteUsersModal isVisible={isModalVisible} onSend={handleSend} onCancel={handleCancel}/>
    </div>
  );
};

export default AdminUserList;
