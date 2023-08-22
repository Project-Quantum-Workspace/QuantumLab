import React, { useState } from 'react';
import { Button, Table, Checkbox } from 'antd';

type User = {
  key: string;
  name: string;
  userID: string;
  status: string;
  role: string;
};

const initialUsers: User[] = [
  // Add your initial data here. For example:
  // {
  //   key: '1',
  //   name: 'John Doe',
  //   userID: 'JD01',
  //   status: 'Active',
  //   role: 'Admin',
  // }
];

const AdminUserList: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const columns = [
    {
      title: '',
      dataIndex: 'selection',
      render: (_: any, record: User) => (
        <Checkbox
          checked={selectedUsers.includes(record.key)}
          onChange={() => toggleUserSelection(record.key)}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'User ID',
      dataIndex: 'userID',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
  ];

  const toggleUserSelection = (key: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(key)
        ? prevSelected.filter((k) => k !== key)
        : [...prevSelected, key]
    );
  };

  const setUsersStatus = (status: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (selectedUsers.includes(user.key)) {
          return { ...user, status };
        }
        return user;
      })
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" style={{ marginRight: 8 }}>
          Invite New
        </Button>
        <Button onClick={() => setUsersStatus('Inactive')} style={{ marginRight: 8 }}>
          Set Inactive
        </Button>
        <Button onClick={() => setUsersStatus('Active')}>Set Active</Button>
      </div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default AdminUserList;
