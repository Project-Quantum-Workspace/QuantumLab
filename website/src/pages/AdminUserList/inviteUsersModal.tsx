import { Button, Input, Modal, notification } from 'antd';
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

type InviteUsersModalProps = {
  isVisible: boolean;
  onSend: (validEmails: string[]) => void;
  onCancel: () => void;
};

type EmailItem = {
  email: string;
  isValid: boolean;
};

const InviteUsersModal: React.FC<InviteUsersModalProps> = ({ isVisible, onSend, onCancel }) => {
  const [emailItems, setEmailItems] = useState<EmailItem[]>([]);
  const [currentEmails, setCurrentEmails] = useState<string>('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleEmailsInput = (inputValue: string) => {
    const emailListFromInput = inputValue.split(/[,\s\n]+/).filter((email) => email.trim() !== ''); // Filters out empty strings
    const uniqueEmailsFromInput = [...new Set(emailListFromInput)];

    const existingEmails = emailItems.map((item) => item.email);
    const newEmailItems: EmailItem[] = [];

    if (emailListFromInput.length !== uniqueEmailsFromInput.length) {
      notification.error({
        message: 'Duplicate Email Detected',
        description:
          'There are duplicate emails in your input. Please ensure each email is unique before adding.',
      });
      return;
    }

    // Check if the total number of emails (existing plus new) exceeds 100
    if (existingEmails.length + uniqueEmailsFromInput.length > 100) {
      notification.error({
        message: 'Too Many Emails',
        description:
          'You can only add and send 100 emails at once. Please reduce the number of emails and try again.',
      });
      return;
    }

    for (const email of uniqueEmailsFromInput) {
      if (existingEmails.includes(email)) {
        notification.error({
          message: 'Already Exist',
          description: `The email "${email}" is already in the list.`,
        });
        continue;
      }
      newEmailItems.push({ email, isValid: isValidEmail(email) });
    }

    setEmailItems((prevItems) => [...prevItems, ...newEmailItems]);
    setCurrentEmails('');
  };

  const handleEmailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (newValue.includes('\n')) {
      setCurrentEmails(newValue);
      handleEmailsInput(newValue);
      setCurrentEmails(''); // Clear after processing
    } else {
      setCurrentEmails(newValue);
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmailItems((emailItems) => emailItems.filter((item) => item.email !== emailToRemove));
  };

  const sendInvitations = () => {
    const invalidEmails = emailItems.filter((item) => !item.isValid).map((item) => item.email);

    if (invalidEmails.length > 0) {
      const descriptionContent = (
        <div>
          The following {invalidEmails.length === 1 ? 'email is' : 'emails are'} invalid:{' '}
          <span style={{ fontWeight: 'bold' }}>{invalidEmails.join(', ')}</span>
        </div>
      );

      notification.error({
        message: 'Not Ready to Send: Invalid Email',
        description: descriptionContent,
      });
      return;
    }

    onSend(emailItems.map((item) => item.email));
    setEmailItems([]);
  };

  const handleSend = () => {
    // If the currentEmails textarea is not empty, add those emails first
    if (currentEmails !== '') {
      console.log('send clicked but not empty');
      handleEmailsInput(currentEmails);
    }

    // Only proceed with sending the invitations if the currentEmails textarea is empty and there are emails to send.
    if (currentEmails === '' && emailItems.length > 0) {
      sendInvitations();
    } else if (emailItems.length === 0 && currentEmails === '') {
      notification.error({
        message: 'Incomplete Action',
        description: 'There are no emails to send. Please add some first.',
      });
    }
  };

  return (
    <Modal
      title="Invite New Users"
      open={isVisible}
      onOk={handleSend}
      onCancel={onCancel}
      okText={currentEmails !== '' ? 'Add' : 'Send'}
      okButtonProps={{ disabled: emailItems.length === 0 && currentEmails === '' }}
      cancelButtonProps={{ style: { display: 'inline-block' } }} // Display the Cancel button
      maskClosable={false} // Prevents closing modal when clicking outside
      closable={false} // Disable the close (cross) icon
    >
      <div style={{ marginBottom: '10px' }}>
        {emailItems.map((item) => (
          <span
            key={item.email}
            style={{
              display: 'inline-flex', // Use flex to align items vertically
              alignItems: 'center', // Vertically center items
              margin: '5px',
              padding: '5px',
              backgroundColor: item.isValid ? '#96d265' : 'salmon',
              borderRadius: '5px',
            }}
          >
            {item.email}
            <Button
              size="small"
              style={{
                marginLeft: '5px',
                background: 'none', // Make the button background transparent
                border: 'none', // Remove the button border
              }}
              onClick={() => removeEmail(item.email)}
            >
              <CloseOutlined style={{ color: 'white' }} /> {/* Close icon */}
            </Button>
          </span>
        ))}
      </div>
      <Input.TextArea
        value={currentEmails}
        onChange={handleEmailsChange}
        placeholder="Enter emails, separated by commas, spaces, or new lines"
        rows={4}
      />
      <p style={{ whiteSpace: 'nowrap' }}>
        The new users will be created with a default password and access level 1.
      </p>
    </Modal>
  );
};

export default InviteUsersModal;
