import React, { useState } from "react"
import axios from "axios"
import "semantic-ui-css/semantic.min.css"
import {
  Form,
  Segment,
  Header,
  Container,
  Transition,
  List,
  Icon,
} from "semantic-ui-react"
import { navigate } from "@reach/router"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

const StyledSegment = styled(Segment)`
  &&&& {
    margin: 0em;
    text-align: center;
    color: #084166;
  }
`

const StyledText = styled(Container)`
   {
    font-size: 1.25em;
  }
`

const StyledHeader = styled(Container)`
  letter-spacing: 0.1em;
  margin-bottom: 2.5em;
  h2 {
    text-transform: uppercase;
    font-size: 2.5em;
    display: inline-block;
  }
`
const Underline = styled.div`
  border-top: 2px solid #728087;
  margin: 0.3em auto 0em auto;
`

const StyledForm = styled(Form)`
  &&& {
  }
  &&&&& > .input {
    margin: 0em 0em 1.5em 0em;
    border: 1px solid #728087;
    border-radius: 4px;
  }
`

const StyledList = styled(List)`
  &&& {
    color: #222533;
    margin: 0;
    min-width 100px;
  }

  &&&&& .item {
    padding: 0.7em 0em;
  }
`
const StyledContent = styled(Container)`
  &&&&& {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
`
const StyledFormContainer = styled.div`
  &&&&&&& {
    max-width: 500px;
    flex: 1 0 300px;
    margin: 0 2.5em;
  }
`
const StyledListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  min-width: 250px;
  margin-top: 2.5em;
`

export default () => {
  const [name, changeName] = useState("")
  const [email, changeEmail] = useState("")
  const [message, changeMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    changeName("")
    changeEmail("")
    changeMessage("")
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    axios({
      method: "POST",
      url: "https://chika-mba-mailer.herokuapp.com/send",
      data: { name, email, message },
    })
      .then(response => {
        console.log(response.data)
        if (response.data.message === "success") {
          if (typeof window !== `undefined`) {
            resetForm()
            alert("Message Sent.")
            setLoading(false)
            navigate("/")
          }
        } else if (response.data.message === "fail") {
          if (typeof window !== `undefined`) {
            alert("Message failed to send.")
            setLoading(false)
          }
        }
      })
      .catch(err => {
        console.log(err)
        alert(
          "Message failed to send:\n\n" + err.response
            ? err.response.data.message
            : err
        )
        setLoading(false)
      })
  }
  return (
    <Layout>
      <SEO
        title="Contact Us"
        url="/contact"
        description="E-mail any inquiries to info@cmbaconsulting.ca using the contact form"
      />

      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Segment vertical basic>
          <Transition
            mountOnShow={false}
            animation="fade up"
            duration={1000}
            transitionOnMount
          >
            <StyledSegment basic>
              <Transition
                mountOnShow={false}
                transitionOnMount
                animation="fade up"
                duration={1000}
              >
                <StyledHeader>
                  <h2>Contact</h2>
                  <Underline />
                </StyledHeader>
              </Transition>
            </StyledSegment>
          </Transition>

          <StyledContent>
            <StyledFormContainer>
              <Transition
                mountOnShow={false}
                transitionOnMount
                animation="fade up"
                duration={1000}
              >
                <StyledForm
                  size="large"
                  id="contact-form"
                  onSubmit={handleSubmit}
                >
                  <Form.Input
                    className="input"
                    type="text"
                    required
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={e => changeName(e.target.value)}
                  />
                  <Form.Input
                    className="input"
                    type="email"
                    placeholder="Email address"
                    required
                    id="email"
                    value={email}
                    onChange={e => changeEmail(e.target.value)}
                  />
                  <Form.TextArea
                    className="input"
                    rows="5"
                    required
                    placeholder="Message"
                    id="message"
                    value={message}
                    onChange={e => changeMessage(e.target.value)}
                  />
                  <Form.Button
                    size="large"
                    style={{ width: "50%", margin: "0 auto" }}
                    fluid
                    primary
                    disabled={loading}
                    loading={loading}
                  >
                    Submit
                  </Form.Button>
                </StyledForm>
              </Transition>
            </StyledFormContainer>

            <StyledListContainer>
              <Transition
                mountOnShow={false}
                transitionOnMount
                animation="fade up"
                duration={1000}
              >
                <StyledList size="large">
                  <List.Item>
                    <Icon name="map pin" />
                  </List.Item>

                  <List.Item>
                    <Icon name="phone" />
                  </List.Item>

                  <List.Item>
                    <Icon name="envelope" />
                  </List.Item>
                </StyledList>
              </Transition>
              <Transition
                mountOnShow={false}
                transitionOnMount
                animation="fade up"
                duration={1000}
              >
                <StyledList size="large">
                  <List.Item>Stittsville, Ontario</List.Item>

                  <List.Item> (613) 663-4768</List.Item>

                  <List.Item>info@cmbaconsulting.ca</List.Item>
                </StyledList>
              </Transition>
            </StyledListContainer>
          </StyledContent>
        </Segment>
      </Container>
    </Layout>
  )
}

// GraphQL query implementation
// const query = `mutation SendEmail($service: String!,
//   $user: String!,
//   $password: String!,
//   $name: String!,
//   $email: String!,
//   $message: String!) {
//     sendEmail(
//       service: $service,
//       user: $user,
//       password: $password,
//       name: $name,
//       email: $email,
//       message: $message
//   ){ message }}
//   `
