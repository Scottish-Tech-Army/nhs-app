import { Amplify } from "@aws-amplify/core";
import { Auth, CognitoUser } from "@aws-amplify/auth";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      getByLabel(label: string): Chainable<void>;
      loginByCognitoApi(username: string, password: string): Chainable<void>;
      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.add("getByLabel", (label) => {
  // you can disable individual command logging
  // by passing {log: false} option
  cy.log("**getByLabel**");
  cy.contains("label", label)
    .invoke("attr", "for")
    .then((id) => {
      cy.get("#" + id);
    });
});

Amplify.configure(Cypress.env("awsConfig"));

// Amazon Cognito
Cypress.Commands.add("loginByCognitoApi", (username, password) => {
  const log = Cypress.log({
    displayName: "COGNITO LOGIN",
    message: [`🔐 Authenticating | ${username}`],
    // @ts-ignore
    autoEnd: false,
  });

  log.snapshot("before");

  const signIn = Auth.signIn({ username, password }) as Promise<CognitoUser>;

  cy.wrap<Promise<CognitoUser>, CognitoUser>(signIn, { log: false }).then(
    (cognitoResponse) => {
      const signInUserSession = cognitoResponse.getSignInUserSession()!;
      const username = cognitoResponse.getUsername();

      // These are not exported fields - risky to use
      const keyPrefix = (cognitoResponse as any).keyPrefix;
      const clockDrift = (signInUserSession as any).clockDrift;

      const keyPrefixWithUsername = `${keyPrefix}.${username}`;

      window.localStorage.setItem(
        `${keyPrefixWithUsername}.idToken`,
        signInUserSession.getIdToken().getJwtToken()
      );

      window.localStorage.setItem(
        `${keyPrefixWithUsername}.accessToken`,
        signInUserSession.getAccessToken().getJwtToken()
      );

      window.localStorage.setItem(
        `${keyPrefixWithUsername}.refreshToken`,
        signInUserSession.getRefreshToken().getToken()
      );

      window.localStorage.setItem(
        `${keyPrefixWithUsername}.clockDrift`,
        clockDrift
      );

      window.localStorage.setItem(`${keyPrefix}.LastAuthUser`, username);

      window.localStorage.setItem(
        "amplify-authenticator-authState",
        "signedIn"
      );
      log.snapshot("after");
      log.end();
    }
  );

  cy.visit("/");
});
