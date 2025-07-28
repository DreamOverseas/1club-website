import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Modal, Form } from 'react-bootstrap';

const CMS_endpoint = import.meta.env.VITE_CMS_API_ENDPOINT;
const CMS_token = import.meta.env.VITE_CMS_API_KEY;

const DetailUpdateBtn = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [membershipNumber, setMembershipNumber] = useState(null);
  const [documentID, setDocumentID] = useState(null);

  const [phone, setPhone] = useState('');

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');

  const handleOpenPwd = async () => {
    const userCookie = Cookies.get('user');
    if (!userCookie) return;
    const { email } = JSON.parse(userCookie);

    const res = await fetch(`${CMS_endpoint}/api/one-club-memberships?filters[Email][$eq]=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CMS_token}`
      }
    });

    const user_data = await res.json();
    if (user_data.data && user_data.data.length > 0) {
      const record = user_data.data[0];
      setDocumentID(record.documentId);
      setMembershipNumber(record.MembershipNumber);
      setShowPwdModal(true);
    }
  };

  const handleOpen = async () => {
    const userCookie = Cookies.get('user');
    if (!userCookie) return;
    const { email } = JSON.parse(userCookie);

    const res = await fetch(`${CMS_endpoint}/api/one-club-memberships?filters[Email][$eq]=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CMS_token}`
      }
    });

    const user_data = await res.json();
    if (user_data.data && user_data.data.length > 0) {
      const record = user_data.data[0];
      setDocumentID(record.documentId);
      setMembershipNumber(record.MembershipNumber);
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setShowPwdModal(false);
    setError('');
    setPhone('');
  };

  const handleSubmit = async () => {
    setError('');
    if (!phone) {
      setError('Please update at least one field.');
      return;
    }

    const payload = {};
    if (phone) payload.Phone = phone;

    try {
      const res = await fetch(`${CMS_endpoint}/api/one-club-memberships/${documentID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CMS_token}`
        },
        body: JSON.stringify({ data: payload })
      });

      if (res.ok) {
        const existing = Cookies.get('user');
        const userData = existing ? JSON.parse(existing) : {};
        const updatedData = {
          ...userData,
          ...(phone ? { phone: phone } : {}),
        };
        Cookies.set('user', JSON.stringify(updatedData), { expires: 7, path: '/' });
        handleClose();
        window.location.reload();
      } else {
        setError('Update failed. Please try again.');
      }
    } catch (err) {
      setError('Error updating details. Please try again later.');
    }
  };

  const passwordInput = (label, value, setValue, show, setShow) => (
    <Form.Group className="mb-3 position-relative">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={show ? 'text' : 'password'}
        placeholder=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <i
        className={`bi ${show ? 'bi-eye-fill' : 'bi-eye'} position-absolute`}
        style={{
          right: '10px',
          top: '55%',
          cursor: 'pointer',
          zIndex: 2,
          color: '#6c757d',
        }}
        onClick={() => setShow(!show)}
      />
    </Form.Group>
  );

  const handleSubmitPwd = async () => {
    setError('');

    // 1. Validate password match
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    // 2. Validate old password with backend
    try {
      const userCookie = Cookies.get('user');
      if (!userCookie) {
        setError('User not authenticated.');
        return;
      }

      const verifyRes = await fetch(`${CMS_endpoint}/api/one-club-memberships/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CMS_token}`
        },
        body: JSON.stringify({
          membershipNumber: membershipNumber,
          password: oldPassword
        })
      });

      if (!verifyRes.ok) {
        setError('Old password is incorrect.');
        return;
      }

      // const verifyData = await verifyRes.json();
      // if (!verifyData.valid) {
      //   setError('Old password verification failed.');
      //   return;
      // }

      // 3. Submit new password
      const updateRes = await fetch(`${CMS_endpoint}/api/one-club-memberships/${documentID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CMS_token}`
        },
        body: JSON.stringify({
          data: {
            Password: newPassword
          }
        })
      });

      if (updateRes.ok) {
        handleClose(); // close modal and reset fields
        alert('Password updated successfully!');
      } else {
        setError('Failed to update password. Please try again.');
      }
    } catch (err) {
      console.error('Password update error:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Button onClick={handleOpenPwd} variant="warning">
        更新密码
      </Button>
      &nbsp;
      <Button onClick={handleOpen} variant="primary">
        更新电话
      </Button>

      <Modal show={showPwdModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>更新密码</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {passwordInput("Old Password", oldPassword, setOldPassword, showOld, setShowOld)}
          {passwordInput("New Password", newPassword, setNewPassword, showNew, setShowNew)}
          {passwordInput("Confirm Password", confirmPassword, setConfirmPassword, showConfirm, setShowConfirm)}
          {error && <div className="text-danger small mt-2">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSubmitPwd}>
            确定
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>更新电话</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="text-danger small mb-3">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Not Changing..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailUpdateBtn;
