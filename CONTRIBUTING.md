# Contributing to Kanya

Thank you for your interest in contributing to Kanya! This document provides guidelines and instructions for contributing to the project.

## 🎯 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- PostgreSQL (via Supabase)
- Basic knowledge of Next.js, TypeScript, and React

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/kanya.git
   cd kanya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/kanya/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check if the feature has been suggested in [Issues](https://github.com/yourusername/kanya/issues)
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - Mockups or examples (if applicable)

### Submitting Pull Requests

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Write clear commit messages
   - Add tests for new features
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve bug"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Link related issues

## 💻 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Use enums for constants

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names
- Extract reusable logic into custom hooks

### File Naming
- Components: `PascalCase.tsx` (e.g., `PetCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Hooks: `use*.ts` (e.g., `useAuth.ts`)
- API routes: `route.ts` in Next.js App Router

### Code Formatting
- Use Prettier for formatting (runs on save)
- Use ESLint for linting
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add swipe animation to discovery feed
fix: resolve match notification not showing
docs: update README with setup instructions
```

## 🧪 Testing Guidelines

### Unit Tests
- Write tests for utility functions
- Test edge cases
- Use descriptive test names
- Aim for 80%+ coverage

### Integration Tests
- Test API endpoints
- Test database operations
- Test authentication flows

### E2E Tests
- Test critical user flows
- Test on multiple browsers
- Test mobile responsiveness

## 📚 Documentation

- Update README.md for major changes
- Add JSDoc comments for complex functions
- Update API documentation
- Include examples in documentation

## 🔍 Code Review Process

1. All PRs require at least one approval
2. Address review comments promptly
3. Keep PRs focused and small
4. Ensure CI/CD checks pass
5. Squash commits before merging

## 🎨 Design Guidelines

- Follow the existing design system
- Use Shadcn UI components when possible
- Maintain consistent spacing and colors
- Ensure mobile responsiveness
- Test accessibility (WCAG 2.1 AA)

## 🚫 What NOT to Contribute

- Breaking changes without discussion
- Code that doesn't follow style guidelines
- Features without tests
- Incomplete features
- Plagiarized code
- Code with security vulnerabilities

## 📞 Getting Help

- Join our [Discord](https://discord.gg/kanya) (if available)
- Ask questions in [Discussions](https://github.com/yourusername/kanya/discussions)
- Check the [documentation](docs/)
- Review existing issues and PRs

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the app (for major contributions)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Kanya! 🐾
