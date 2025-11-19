import { Emitter } from '@t/event';
import { EditorType, PreviewStyle } from '@t/editor';
import i18n from '@/i18n/i18n';
import { cls } from '@/utils/dom';
import html from '../vdom/template';
import { Component } from '../vdom/component';

interface Props {
  editorType: EditorType;
  previewStyle: PreviewStyle;
  eventEmitter: Emitter;
  onPreviewStyleChange: (style: PreviewStyle) => void;
  lastPreviewStyle: Exclude<PreviewStyle, 'markdown-only'>;
}

interface State {
  hide: boolean;
}

export class Switch extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hide: false,
    };
  }

  show() {
    this.setState({ hide: false });
  }

  hide() {
    this.setState({ hide: true });
  }

  private activateMarkdownView = () => {
    const { editorType, previewStyle, eventEmitter, lastPreviewStyle, onPreviewStyleChange } =
      this.props;

    if (editorType !== 'markdown') {
      eventEmitter.emit('needChangeMode', 'markdown');
    }

    if (previewStyle === 'markdown-only') {
      onPreviewStyleChange(lastPreviewStyle);
    }
  };

  private activateMarkdownOnly = () => {
    const { editorType, previewStyle, eventEmitter, onPreviewStyleChange } = this.props;

    if (editorType !== 'markdown') {
      eventEmitter.emit('needChangeMode', 'markdown');
    }

    if (previewStyle !== 'markdown-only') {
      onPreviewStyleChange('markdown-only');
    }
  };

  private activateWysiwyg = () => {
    const { editorType, previewStyle, eventEmitter, lastPreviewStyle, onPreviewStyleChange } =
      this.props;

    if (editorType !== 'wysiwyg') {
      eventEmitter.emit('needChangeMode', 'wysiwyg');
    }

    if (previewStyle === 'markdown-only') {
      onPreviewStyleChange(lastPreviewStyle);
    }
  };

  render() {
    const { editorType, previewStyle } = this.props;
    const markdownActive = editorType === 'markdown' && previewStyle !== 'markdown-only';
    const markdownOnlyActive = editorType === 'markdown' && previewStyle === 'markdown-only';
    const wysiwygActive = editorType === 'wysiwyg';

    return html`
      <div class="${cls('mode-switch')}" style="display: ${this.state.hide ? 'none' : 'block'}">
        <div class="tab-item${markdownActive ? ' active' : ''}" onClick=${this.activateMarkdownView}>
          ${i18n.get('Markdown')}
        </div>
        <div
          class="tab-item${markdownOnlyActive ? ' active' : ''}"
          onClick=${this.activateMarkdownOnly}
        >
          ${i18n.get('Markdown Only')}
        </div>
        <div class="tab-item${wysiwygActive ? ' active' : ''}" onClick=${this.activateWysiwyg}>
          ${i18n.get('WYSIWYG')}
        </div>
      </div>
    `;
  }
}
