// RecaptchaAction name may only include "A-Za-z/_"
export enum RecaptchaAction {
	LOGIN = 'login',
	REGISTER = 'register',
	CONFIRM_REGISTRATION = 'confirm_registration',
	RESEND_REGISTER_CONFIRMATION_CODE = 'resend_register_confirmation_code',
	RECOVER_PASSWORD = 'recover_password',
	RESET_PASSWORD = 'reset_password',
	IS_EMAIL_AND_NICKNAME_AVAILABLE = 'is_email_and_nickname_available',
	CREATE_REPORT = 'create_report',
	CONFIRM_USER_EMAIL = 'confirm_user_email',
	RESEND_CONFIRMATION_EMAIL = 'resend_confirmation_email',
	GET_USER_EMAILS = 'get_user_emails',
	ADD_EXTRA_EMAIL = 'add_extra_email',
	DELETE_EXTRA_EMAIL = 'delete_extra_email',
	UPDATE_USER_PASSWORD = 'update_user_password',
	UPDATE_USER_MAIN_EMAIL = 'update_user_main_email',
	CANCEL_CONFIRMATION_EMAIL = 'cancel_confirmation_email',
}
