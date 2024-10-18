import {Form, CheckBoxGroup, CheckBoxItem} from '@financial-times/o3-form';

function ButtonPreview() {
	return (
		<div style={{width: '50%'}}>
			<meta itemProp="@preview" />
			<Form>
				<CheckBoxGroup
					label="Notification preferences"
					description="How would you like to be updated?">
					<CheckBoxItem
						checkboxLabel="Email notifications"
						inputId="email-notification-checkbox"
						attributes={{defaultChecked: true}}
					/>
					<CheckBoxItem
						checkboxLabel="SMS notifications"
						inputId="sms-notification-checkbox"
					/>
					<CheckBoxItem
						checkboxLabel="In-app notifications"
						inputId="in-app-notification-checkbox"
					/>
				</CheckBoxGroup>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath = 'src/components/form/preview/Checkbox-group.tsx';

export {ButtonPreview as preview};
