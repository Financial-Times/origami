import './../../main.js';
import Table from "@financial-times/o-table";
import SyntaxHighlight from "@financial-times/o-syntax-highlight";
import Tabs from "@financial-times/o-tabs";
import HeaderServices from "@financial-times/o-header-services";
import Forms from "@financial-times/o-forms";

document.addEventListener('DOMContentLoaded', () => {
	Table.init();
	SyntaxHighlight.init();
	Tabs.init();
	HeaderServices.init();
	Forms.init();
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
