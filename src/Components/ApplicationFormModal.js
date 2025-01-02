import React, { useState, useEffect } from 'react';
import "../Styles/Components.css";
import axios from 'axios';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

// Read Env
const BACKEND_HOST = process.env.REACT_APP_CMS_API_ENDPOINT;
const API_KEY_1CLUB = process.env.REACT_APP_CMS_API_KEY;
const MAIL_API = `${process.env.REACT_APP_EMAIL_API_ENDPOINT}/1club/membership-notify`;

const ApplicationFormModal = ({ active, membershipClass, onClose }) => {
  // Form State
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Address: '',
    Referee: '',
    Occupation: '',
    MembershipClass: membershipClass || '',
  });
  //Display lookup
  const classDisplay = {
    Gold: "黄金会员 - $5888/5年",
    Platinum: "铂金会员 - $18,888/5年",
    Diamond: "钻石会员 - $58,888/5年",
  }

  // set default with useEffect
  useEffect(() => {
    if (membershipClass) {
      setFormData((prev) => ({ ...prev, MembershipClass: membershipClass }));
    }
  }, [membershipClass]);

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.Name.trim()) newErrors.name = '请提供您的名字';
    if (!formData.Email.trim()) newErrors.email = '请提供您的邮箱';
    if (!formData.Referee.trim()) newErrors.refree = '请提供您的举荐人';
    if (!formData.MembershipClass.trim())
      newErrors.membershipClass = '请选择您申请的会员等级';
    return newErrors;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          `${BACKEND_HOST}/api/one-club-memberships`,
          { data: formData }, // Request payload
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${API_KEY_1CLUB}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          try {
            await axios.post( MAIL_API,
              { "Name": formData.Name,
                "Email": formData.Email
               },
              {
                headers: {
                  'Content-Type': 'application/json'
                },
              }
            );
          } catch (error) {
            console.error('Error message:', error.message);
            alert("提交申请成功，但是内部邮件系统正在维护中...请通过电话或电子邮件联系我们。");
          }
          setShowSuccess(true);
          setFormData({
            Name: '',
            Email: '',
            Phone: '',
            Address: '',
            Referee: '',
            Occupation: '',
            MembershipClass: membershipClass || '',
          });
        } else {
          alert("提交失败了。");
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        if (error.response) {
          // Server responded with a status code out of the 2xx range
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Request made but no response received:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      setErrors(validationErrors);
    }
  };

  return (
    <Modal show={active} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title><b>会员申请表</b></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess && (
          <Alert variant="success">提交成功！我们将会在审核通过后通知您，期待您的加入！</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>姓名*</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>电子邮箱*</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label>电话</Form.Label>
            <Form.Control
              type="text"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label>地址</Form.Label>
            <Form.Control
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formRefree" className="mb-3">
            <Form.Label>举荐人*</Form.Label>
            <Form.Control
              type="text"
              name="Referee"
              value={formData.Referee}
              onChange={handleChange}
              isInvalid={!!errors.refree}
            />
            <Form.Control.Feedback type="invalid">
              {errors.refree}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formOccupation" className="mb-3">
            <Form.Label>当前职业</Form.Label>
            <Form.Control
              type="text"
              name="Occupation"
              value={formData.Occupation}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formMembershipClass" className="mb-3">
            <Form.Label>会员等级*</Form.Label>
            <Form.Control
              as="select"
              name="MembershipClass"
              value={formData.MembershipClass}
              onChange={handleChange}
              isInvalid={!!errors.membershipClass}
            >
              <option value="">选择您想申请的会员等级...</option>
              <option value="Gold">{classDisplay["Gold"]}</option>
              <option value="Platinum">{classDisplay["Platinum"]}</option>
              <option value="Diamond">{classDisplay["Diamond"]}</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.membershipClass}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Text id="fill-all-notice" muted>
            推荐所有项目全部填入内容，可以提高审核速度与通过率。
          </Form.Text>

          <div className="text-end">
            <Button variant="dark" className='member-applic-submit-button' type="submit">
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {"正在提交..."}
                </>
              ) : (
                "提交申请"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ApplicationFormModal;
