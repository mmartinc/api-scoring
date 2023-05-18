import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-yaml';
import 'prismjs/themes/prism.css';
import styles from './code-block.module.css';
import type { Grammar } from 'prismjs';

export type CodeBlockProps = {
  code: string;
  onCodeChange: (code: string) => void;
};

export const CodeBlock = (props: CodeBlockProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__editor}>
        <div className={styles.container_editor_area}>
          <Editor
            value={props.code}
            onValueChange={props.onCodeChange}
            highlight={(code) =>
              highlight(code, languages.yaml as Grammar, 'yaml')
                .split('\n')
                .map(
                  (line) =>
                    `<span class=${
                      styles.container_editor_line_number ?? ''
                    }>${line}</span>`
                )
                .join('\n')
            }
            padding={10}
            textareaId='codeArea'
            className={styles.container__editor}
            style={{
              overflow: 'visible',
            }}
          />
        </div>
      </div>
    </div>
  );
};
