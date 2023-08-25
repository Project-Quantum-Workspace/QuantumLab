import { Button, Input, Modal, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';

type User = {
  email: string;
  uuid: string;
  id: number;
  accountStatus: number;
  accessLevel: number;
  role: string;
};

const AdminUserList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [inviteEmails, setInviteEmails] = useState<string>('');

  useEffect(() => {
    fetch('/api/admin/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
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
          user.uuid === uuid ? { ...user, accountStatus: status, accessLevel } : user,
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
      title: 'Email',
      dataIndex: 'email',
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

  const handleOk = () => {
    setIsModalVisible(false);
    notification.success({
      message: 'Invitations Sent',
      description: 'Invitations have been sent to the provided emails.',
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onInviteEmailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInviteEmails(e.target.value);
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

      <Modal title="Invite New Users" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input.TextArea
          value={inviteEmails}
          onChange={onInviteEmailsChange}
          placeholder="Enter emails, separated by new lines"
        />
        <p>The new users will be created with default password and access level 1.</p>
      </Modal>
    </div>
  );
};

export default AdminUserList;
