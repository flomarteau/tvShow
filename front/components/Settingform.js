import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';
import { Divider, Button } from 'react-native-elements';
import { initialize, reduxForm, Field } from "redux-form";
import textSetting from './textSetting';


class Settingform extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Form>

            <Item floatingLabel>
              <Label>First Name</Label>
              <Field
                name="firstName"
                component={textSetting}
                />
            </Item>

            <Item floatingLabel last>
              <Label>Last Name</Label>
              <Field
                name="lastName"
                component={textSetting}
                />
            </Item>

            <Item floatingLabel last>
              <Label>Email</Label>
              <Field
                name="email"
                component={textSetting}
                />
            </Item>

            <Item floatingLabel last>
              <Label>Password</Label>
              <Field
                name="password"
                component={textSetting}
                />
            </Item>

            <Divider style={{ height: 20, backgroundColor: 'white' }} />

            <Button
              onPress={this.props.handleSubmit}
              title="Save My Settings"
              textStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "#3498db",
                width: 200,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
              }}
            />

          </Form>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'settingform'
})(Settingform)
