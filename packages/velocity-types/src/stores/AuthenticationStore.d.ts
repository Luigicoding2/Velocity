import { FluxStore } from "..";

export type MFAType = "webauthn" | "totp" | "backup" | "sms";

export interface MFAMethod {
    type: MFAType;
    challenge?: string;
}

export type LoginStatus = "NONE" | "LOGGING_IN" | "ACCOUNT_SCHEDULED_FOR_DELETION" | "ACCOUNT_DISABLED" | "FORGOT_PASSWORD" | "MFA_STEP" | "LOGGING_IN_MFA" | "MFA_SMS_STEP" | "LOGGING_IN_MFA_SMS" | "LOGIN_AGE_GATE" | "PASSWORD_RECOVERY_VERIFY_PHONE" | "PHONE_IP_AUTHORIZATION";

export interface AuthenticationCredentials {
    [key: string]: unknown;
}

export class AuthenticationStore extends FluxStore {
    /** Gets the current authenticated user id */
    getId(): string;

    /** Gets the current session id
     * @returns 32-character hexadecimal string generated from a MD5 cryptographic hash.
     */
    getSessionId(): ?string;

    /** Gets the auth session id hash */
    getAuthSessionIdHash(): string;

    /** Gets the static auth session id
     * @returns a random UUID hash generated at login time.
     */
    getStaticAuthSessionId(): ?string;

    /** Gets the current authentication token of a session */
    getToken(): string;

    /** Returns whether the user is currently authenticated */
    isAuthenticated(): boolean;

    /** Gets the current login status state */
    getLoginStatus(): LoginStatus;

    /** Gets the device fingerprint and used for tracking and security */
    getFingerprint(): ?string;

    /** Gets the installation identifier used for tracking */
    getInstallationForTracking(): ?string;

    /** Gets the analytics authentication token */
    getAnalyticsToken(): ?string;

    /** Gets the MFA ticket for the current authentication flow */
    getMFATicket(): string;

    /** Gets enabled MFA methods for the current login session */
    getMFAMethods(): MFAMethod[];

    /** Returns whether TOTP-based MFA is enabled for the account */
    hasTOTPEnabled(): boolean;

    /** Gets the login instance identifier */
    getLoginInstanceId(): string | undefined;

    /** Returns the stored authentication credentials if available */
    getCredentials(): AuthenticationCredentials | [];

    /** Determines whether logout should redirect */
    allowLogoutRedirect(): boolean;

    /** Gets the suspended user token if the account is suspended */
    getSuspendedUserToken(): ?string;

    /** Returns whether passwordless authentication is active */
    getIsPasswordlessActive(): boolean;

    /** Returns whether a password login attempt was made */
    attemptedPasswordLogin(): boolean;
}
