# Grid Project - Decentralized Application Deployment Platform

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Next.js](https://img.shields.io/badge/Next.js-13.5.7-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

A modern, decentralized application deployment platform built with Next.js, React, and blockchain technology. This platform enables users to deploy applications on various cloud providers including Akash Network and Flux, with integrated cryptocurrency payments and secure authentication.

## 🚀 Features

- **Multi-Cloud Deployment**: Deploy applications on Akash Network and Flux
- **Blockchain Integration**: Built-in cryptocurrency wallet support and payments
- **Secure Authentication**: Advanced security with fingerprinting and secure storage
- **Application Management**: Comprehensive dashboard for managing deployed applications
- **Real-time Monitoring**: Live logs, metrics, and application status tracking
- **Team Collaboration**: Multi-user support with role-based access control
- **Payment Processing**: Integrated Stripe and cryptocurrency payment systems
- **Responsive Design**: Modern UI that works on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **Next.js 13.5.7** - React framework with server-side rendering
- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **CSS Modules** - Scoped styling for components

### Blockchain & Cryptocurrency
- **Bitcoin.js** - Bitcoin transaction handling
- **BIP32/BIP39** - Hierarchical deterministic wallets
- **Secp256k1** - Elliptic curve cryptography
- **CosmWasm** - Smart contract platform integration

### Security & Storage
- **React Secure Storage** - Encrypted local storage
- **Crypto.js** - Cryptographic utilities
- **Fingerprinting** - Advanced device identification
- **JWT Authentication** - Secure token-based auth

### Payment Processing
- **Stripe** - Traditional payment processing
- **Cryptocurrency Payments** - Direct crypto transactions

### Development Tools
- **Jest** - Testing framework
- **ESLint** - Code quality and linting
- **Prettier** - Code formatting
- **Webpack Bundle Analyzer** - Bundle optimization

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:4000](http://localhost:4000)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── applications2/   # Application management
│   ├── deploy/         # Deployment components
│   ├── billing/        # Payment and billing
│   ├── login/          # Authentication
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Next.js pages and API routes
├── styles/             # Global styles and CSS modules
└── types.d.ts          # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🌐 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Ensure all required environment variables are set in your production environment:
- API keys and secrets
- Payment processor credentials
- Blockchain network configurations

## 🔒 Security Features

- **Device Fingerprinting**: Advanced browser fingerprinting for security
- **Secure Storage**: Encrypted local storage for sensitive data
- **HTTPS Enforcement**: Secure communication protocols
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: API rate limiting to prevent abuse

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2025 Grid Project Contributors

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

**Important**: This license requires that any application that provides a web service using this code must also be licensed under the AGPL-3.0 and make its source code available to users.

## 🆘 Support

- **Documentation**: Check the docs folder for detailed guides
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions
- **Email**: Contact the development team for enterprise support

## 🙏 Acknowledgments

- **SSP Wallet Team** - For the fingerprinting technology and blockchain wallet infrastructure
- **Next.js Team** - For the amazing React framework
- **React Community** - For the robust ecosystem
- **Blockchain Community** - For the decentralized infrastructure
- **Open Source Contributors** - For making this project possible

## 📊 Project Status

- **Status**: Active Development
- **Maintainers**: Grid Project Team

---

**Built with ❤️ by the Grid Project Team**

*Empowering decentralized application deployment through blockchain technology.*
