# CodeBlock

A dark terminal-style block for commands, code snippets and folder trees, identical in both themes.

- **Consumer provides:** a `<pre class="ah-code">` with plain text; optionally wrap spans in `.c` (comment/prompt, `code-muted`), `.k` (command/keyword, `code-key`), `.s` (flag/string/file, `code-str`).
- Scrolls horizontally rather than wrapping; never truncate a command.
- For code inside prose use `<code class="ah-inline-code">`.
- Don't: syntax-highlight with more than these three roles; put explanations inside the block — use a `.c` comment line.
