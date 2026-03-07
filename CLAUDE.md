# Infinity Calc - Project Guidelines

## 🤖 AI Interaction Layer
This project uses the **Antigravity Awesome Skills** library.

### Skill Usage Rules
- All skills are located in `/.agent/skills`.
- **Invocation**: Use `@skill-name` in chat to trigger a specific skill.
- **Priority**: Always use `@using-superpowers` logic before starting tasks.
- **Process**:
  1. Detect relevant skill.
  2. Announce: "Using [skill] to [purpose]".
  3. Execute skill instructions exactly.

## 🛠️ Project Stack
- **Frontend**: Vanilla HTML/JS with Glassmorphism CSS.
- **Logic**: Secure Shunting-yard math parser (no `eval`).
- **Icons**: SVG-based system.

## 📁 Directory Structure
- `/.agent/skills`: Your expert knowledge modules.
- `/assets`: Styles, scripts, and media.
- `index.html`: Main application entry point.
