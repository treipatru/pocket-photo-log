import { Editor } from "@tinymce/tinymce-react";

/**
 * This is self hosted bundled version of TinyMCE.
 * The config below is mostly the standard one that is proposed in the docs.
 *
 * @see https://www.tiny.cloud/docs/tinymce/latest/react-pm-bundle/
 */

// TinyMCE so the global var exists
import 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model'
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin';

// Plugins
// If you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';

// Content styles, including inline UI like fake cursors
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/ui/oxide/content';

interface Props {
	className?: string;
	onInput: (value: string) => void;
	value: string;
}


/**
 * Using guide from the TinyMCE docs
 *
 * @see https://www.tiny.cloud/docs/tinymce/latest/react-ref/#using-the-tinymce-react-component-as-a-controlled-component
 */

export default function PagesEditor({
	className,
	onInput,
	value,
}: Props) {
	return (
		<div className={className}>
			<Editor
				init={{
					height: 500,
					menubar: false,
					plugins: [
						'advlist', 'anchor', 'autolink', 'link', 'lists',
					],
					toolbar: 'undo redo | blocks | ' +
						'bold italic forecolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist | ' +
						'removeformat',
				}}
				onEditorChange={(newValue) => onInput(newValue)}
				value={value}
				licenseKey="gpl"
			/>
		</div>
	);
}
