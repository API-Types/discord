import type { Range, Tuple } from 'extended-utility-types';
import type { PartialEmoji } from '../';

/**
 * Message components are a framework for adding interactive elements to the
 * messages your app or bot sends. They're accessible, customizable, and easy
 * to use.
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#component-object|Message Components}
 */
export type Component = ActionRow | Button | SelectMenu;

export interface BaseComponent {
	/**
	 * Component type. Valid for all types.
	 */
	type: ComponentType;

	/**
	 * A developer-defined identifier for the component. Max `100` characters.
	 * Valid for Buttons and Select Menus.
	 */
	custom_id?: string;

	/**
	 * Whether the component is disabled. Valud for Buttons and Select Menus.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;

	/**
	 * Button style. Valid for Buttons.
	 */
	style?: ButtonStyle;

	/**
	 * Text that appears on a button. Max `80` characters. Valid for Buttons.
	 */
	label?: string;

	/**
	 * Valid for Buttons.
	 */
	emoji?: PartialEmoji;

	/**
	 * A URL for link-style buttons. Valid for Buttons.
	 */
	url?: string;

	/**
	 * The choices in the select. Max `25`. Valid for Select Menus.
	 */
	options?: Partial<Tuple<SelectOption, 25>>;

	/**
	 * Custom placeholder text if nothing is selected. Max `100` characters.
	 * Valid for Select Menus.
	 */
	placeholder?: string;

	/**
	 * The minimum number of items that must be chosen. Min `0`, max `25`. Valid
	 * for Select Menus.
	 *
	 * @defaultValue `1`
	 */
	min_values?: Range<0, 25>;

	/**
	 * The maximum number of items that can be chosen. Max `25`. Valid for
	 * Select Menus.
	 *
	 * @defaultValue `1`
	 */
	max_values?: Range<1, 25>;

	/**
	 * A list of child components. Valid for Action Rows.
	 */
	components?: BaseComponent[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types|Message Components}
 */
export enum ComponentType {
	/**
	 * A container for other components.
	 */
	ActionRow = 1,

	/**
	 * A button object.
	 */
	Button,

	/**
	 * A select menu for picking from choices.
	 */
	SelectMenu
}

/**
 * An Action Row is a non-interactive container component for other types of
 * components.
 *
 * - A message can have up to `5` Action Rows.
 * - An Action Row cannot contain another Action Row.
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#action-rows|Message Components}
 */
export interface ActionRow {
	/**
	 * `1` for Action Row.
	 */
	readonly type: ComponentType.ActionRow;

	/**
	 * A list of child components.
	 */
	components: Partial<Tuple<Button, 5>> | [SelectMenu];
}

/**
 * Buttons are interactive components that render on messages. They can be
 * clicked by users and send an interaction to your app when clicked.
 *
 * - Buttons must be sent inside an Action Row.
 * - An Action Row can contain up to `5` buttons.
 * - An Action Row containing buttons cannot also contain a select menu.
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-structure|Message Components}
 */
export type Button = NonLinkButton | LinkButton;

export interface BaseButton {
	/**
	 * `2` for a button.
	 */
	readonly type: ComponentType.Button;

	/**
	 * Button style.
	 */
	style: ButtonStyle;

	/**
	 * Text that appears on the button. Max `80` characters.
	 */
	label?: string;
	emoji?: PartialEmoji;

	/**
	 * A developer-defined identifier for the button. Max `100` characters.
	 */
	custom_id?: string;

	/**
	 * A URL for link-style buttons.
	 */
	url?: string;

	/**
	 * Whether the button is disabled.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

export interface NonLinkButton extends Omit<BaseButton, 'url'> {
	/**
	 * Button style.
	 */
	style: Exclude<ButtonStyle, ButtonStyle.Link>;

	/**
	 * A developer-defined identifier for the button. Max `100` characters.
	 */
	custom_id: string;
}

export interface LinkButton extends Omit<BaseButton, 'custom_id'>, Required<Pick<BaseButton, 'url'>> {
	/**
	 * `4` for link-style buttons.
	 */
	readonly style: ButtonStyle.Link;

	/**
	 * A URL for link-style buttons.
	 */
	url: string;
}

/**
 * Buttons come in a variety of styles to convey different types of actions.
 * These styles also define what fields are valid for a button.
 *
 * - Non-link buttons **must** have a `custom_id` and cannot have a `url`.
 * - Link buttons **must** have a `url` and cannot have a `custom_id`.
 * - Link buttons do not send an interaction to the app when clicked.
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-styles|Message Components}
 */
export enum ButtonStyle {
	/**
	 * Blurple color. Requires the `custom_id` field.
	 */
	Primary,

	/**
	 * Grey color. Requires the `custom_id` field.
	 */
	Secondary,

	/**
	 * Green color. Requires the `custom_id` field.
	 */
	Success,

	/**
	 * Red color. Requires the `custom_id` field.
	 */
	Danger,

	/**
	 * Grey color. Navigates to a URL. Requires the `url` field.
	 */
	Link
}

/**
 * Select menus are another interactive component that renders on messages.
 *
 * Select menus support single-select and multi-select behavior, meaning a user
 * can be prompted to choose just one item from a list, or multiple. When a user
 * finishes making their choice by clicking out of the dropdown or closing the
 * half-sheet, your app will receive an interaction.
 *
 * - Select menus **must** be sent inside an Action Row.
 * - An Action Row can contain only one select menu.
 * - An Action Row containing a select menu cannot also contain buttons.
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure|Message Components}
 */
export interface SelectMenu {
	/**
	 * `3` for a select menu.
	 */
	readonly type: ComponentType.SelectMenu;

	/**
	 * A developer-defined name for the select menu. Max `100` characters.
	 */
	custom_id: string;

	/**
	 * The choices in the select. Max `25`.
	 */
	options: Partial<Tuple<SelectOption, 24>>;

	/**
	 * Custom placeholder text if nothing is selected. Max `100` characters.
	 */
	placeholder?: string;

	/**
	 * The minimum number of items that must be chosen. Min `0`, max `25`.
	 *
	 * @defaultValue `1`
	 */
	min_values?: Range<0, 25>;

	/**
	 * The maximum number of items that can be chosen. Max `25`.
	 *
	 * @defaultValue `1`
	 */
	max_values?: Range<1, 25>;

	/**
	 * Whether the select is disabled.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure|Message Components}
 */
export interface SelectOption {
	/**
	 * The user-facing name of the option. Max `100` characters.
	 */
	label: string;

	/**
	 * The dev-defined value of the option. Max `100` characters.
	 */
	value: string;

	/**
	 * An additional description of the option. Max `100` characters.
	 */
	description?: string;
	emoji?: PartialEmoji;

	/**
	 * Will render this option as selected by default.
	 */
	default?: boolean;
}
