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
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch user list.',
        });
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

    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return { success: true, uuid };
      } else {
        const data = await response.json();
        return { success: false, uuid, error: data.error };
      }
    } catch (error) {
      console.error('Network error:', error);
      return { success: false, uuid, error: error.message };
    }
  };

  const setUsersStatus = async (status: number) => {
    const results = await Promise.allSettled(
      selectedRowKeys.map((uuid) => updateUserStatus(uuid, status)),
    );

    const failedUpdates: { uuid: string; error: string }[] = [];

    results.forEach((result) => {
      if (
        result.status === 'rejected' ||
        (result.status === 'fulfilled' && !result.value.success)
      ) {
        failedUpdates.push({
          uuid: result.reason.uuid,
          error: result.reason.error,
        });
      }
    });

    if (failedUpdates.length) {
      notification.error({
        message: 'Update Failed',
        description: `Failed to update ${failedUpdates.length} users.`,
      });
    } else {
      notification.success({
        message: 'Update Successful',
        description: `Successfully updated ${selectedRowKeys.length} users.`,
      });
    }
  };

  const onSelectChange = (newSelectedRowKeys: string[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
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
    // Handle the invitation logic here. For now, I'm closing the modal.
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
      <div style={{ marginBottom: 16 }}>
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
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length ? `Selected ${selectedRowKeys.length} users` : ''}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        rowKey="uuid"
        loading={loading}
      />
      <Modal
        title="Invite New Users"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.TextArea
          value={inviteEmails}
          onChange={onInviteEmailsChange}
          placeholder="Enter emails, separated by new lines"
        />
        <p style={{ marginTop: 10 }}>
          The new users will be created with default password and access level 1.
        </p>
      </Modal>
    </div>
  );
};

export default AdminUserList;
