import { Button, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import InviteUsersModal from './inviteUsersModal';
import { history } from '@umijs/max';
import { UserMetaData } from '@/utils/types/UserTypes';
import AuthApi from '@/services/quantumlab/auth';

type UserRole = {
  id: number;
  name: string;
};

type User = {
  email: string;
  uuid: string;
  id: number;
  firstName: string;
  lastName: string;
  accountStatus: boolean;
  accessLevel: number;
  roles: UserRole[];
};

const AdminUserList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [users, setUsers] = useState<UserMetaData[]>([]);
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

    AuthApi.adminGetUsers()
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

  const updateUserStatus = async (id: number, status: boolean) => {
    const userToUpdate = users.find((user) => user.id === id);
    if (!userToUpdate) return;

    const payload = {
      "accountStatus": status
    };

    try {
      const response = await fetch(`/api/admin/users/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? {...user, accountStatus: status} : user,
          ),
        );
        notification.success({
          message: 'Operation Successful',
          description: data.message || 'User status updated successfully!',
        });
      } else if (response.status === 400) {
        notification.error({
          message: 'Bad Request',
          description: data.message || 'There was an error in the request.',
        });
      } else if (response.status === 403) {
        notification.error({
          message: 'Forbidden',
          description: data.message || 'You are not allowed to perform this action.',
        });
      } else if (response.status === 500) {
        notification.error({
          message: 'Unexpected System Error',
          description: data.message || 'An unexpected system error occurred. Please try again later.',
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'An unexpected error occurred. Please try again.',
        });
      }
    } catch (error) {
      console.error("Unexpected error during fetch operation:", error);
      notification.error({
        message: 'System Error',
        description: 'An unexpected error occurred during the operation. Please try again later.',
      });
    }
  };


  const setUsersStatus = async (status: boolean) => {
    await Promise.all(selectedRowKeys.map((id) => updateUserStatus(id, status)));
  };

  const rowSelection = {
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys as number[]);
    },
  };

  const getSelectedUsers = (): User[] => {
    return users.filter((user) => selectedRowKeys.includes(user.id));
  };

  const areAllSelectedUsersActive = (): boolean => {
    const selected = getSelectedUsers();
    return selected.every((user) => user.accountStatus);
  };

  const areAllSelectedUsersInactive = (): boolean => {
    const selected = getSelectedUsers();
    return selected.every((user) => !user.accountStatus);
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
      title: 'Role(s)',
      dataIndex: 'roles',
      render: (roles: UserRole[]) => roles.map((role) => role.name).join(', '),
    },
    {
      title: 'Status',
      dataIndex: 'accountStatus',
      render: (status: boolean) => (status ? 'Active' : 'Inactive'),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSend = async (emailList: string[]) => {
    try {
      const response = await fetch('/api/admin/users/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailList),
      });

      // Check if the response is successful
      console.log(JSON.stringify(emailList));
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
      console.error('Error during fetch:', error);
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
        <Button type="primary" onClick={showModal} style={{ marginRight: '10px' }}>
          Invite New
        </Button>
        <Button
          type="primary"
          onClick={() => setUsersStatus(true)}
          disabled={areAllSelectedUsersActive()}
          loading={loading}
          style={{ marginRight: '10px' }}
        >
          Set Active
        </Button>

        <Button
          type="primary"
          onClick={() => setUsersStatus(false)}
          disabled={areAllSelectedUsersInactive()}
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
        rowKey="id"
        loading={loading}
        onRow={(user) => {
          return {
            onClick: () => { history.push('/admin/users/' + user.id) },
          };
        }}
      />

      <InviteUsersModal isVisible={isModalVisible} onSend={handleSend} onCancel={handleCancel} />
    </div>
  );
};

export default AdminUserList;
