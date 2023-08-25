import { Modal, Input, Button } from 'antd';
import React, { useState } from 'react';

type InviteUsersModalProps = {
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const InviteUsersModal: React.FC<InviteUsersModalProps> = ({ isVisible, onOk, onCancel }) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState<string>('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleEmailInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentEmail && isValidEmail(currentEmail)) {
      setEmails((prevEmails) => [...prevEmails, currentEmail]);
      setCurrentEmail('');
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails((prevEmails) => prevEmails.filter(email => email !== emailToRemove));
  };

  return (
    <Modal
      title="Invite New Users"
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      {emails.map(email => (
        <span key={email} style={{ display: 'inline-block', margin: '5px', padding: '5px', backgroundColor: '#e0e0e0' }}>
          {email}
          <Button style={{ marginLeft: '5px' }} onClick={() => removeEmail(email)}>X</Button>
        </span>
      ))}
      <Input
        value={currentEmail}
        onChange={(e) => setCurrentEmail(e.target.value)}
        onKeyPress={handleEmailInput}
        placeholder="Enter email and press Enter"
      />
      <p>The new users will be created with default password and access level 1.</p>
    </Modal>
  );
};

export default InviteUsersModal;
