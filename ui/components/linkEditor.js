import { useFormik } from 'formik';
import { useState } from 'react';
import {
  Container,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

/**
 * Requirement 2.1
 * The interface should resemble a modular design
 */

export default function LTC_LinkEditor({ link, onChange, onDelete }) {
  const formik = useFormik({
    initialValues: {
      title: link['title'],
      url: link['url']
    },
  });

  /**
   * Requirement 2.4
   * All links will auto-save after input blur, deletion, and adding links
   */
  function passUp() {
    onChange(formik.values);
  }

  return (
    <div className="w-50 mx-auto mb-2 mt-3">
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className="mb-0" htmlFor="title">Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={passUp} // <-- 2.4 onBlur calls passUp which triggers useEffect on the parent
                  placeholder="Link Title"
                  name="title"
                  id="title"
                  aria-label='title-input'
                />
              </Form.Group>
            </Col>
            <Col xs={7}>
              <Form.Group>
                <Form.Label className="mb-0" htmlFor="url">URL</Form.Label>
                <Form.Control
                  type="text"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  onBlur={passUp}
                  placeholder="https://example.com"
                  name="url"
                  id="url"
                  aria-label='url-input'
                />
              </Form.Group>
            </Col>
            <Col xs={1} className="d-flex align-items-end">
              <Button variant="danger" onClick={onDelete}>&times;</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  )
}