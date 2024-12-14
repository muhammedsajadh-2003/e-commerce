import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Icon } from '../@/components/ui/Icon';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/login', { // Update URL to your backend's URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store the JWT token in local storage
            localStorage.setItem('token', data.token);

            // Redirect user to dashboard or home page
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Login to Your Account
                </h2>

                {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

                <form className="space-y-4" onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button variant="default" size="lg" className="w-full mt-4" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                {/* Social Media Login Options */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-4">or login with</p>
                    <div className="flex justify-center gap-4">
                        {/* Google Login */}
                        <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 px-4 py-2">
                            <Icon name="google" className="text-red-500 text-2xl" />
                        </Button>

                        {/* GitHub Login */}
                        <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 px-4 py-2">
                            <Icon name="github" className="text-gray-800 text-2xl" />
                        </Button>

                        {/* Facebook Login */}
                        <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 px-4 py-2">
                            <Icon name="facebook" className="text-blue-600 text-2xl" />
                        </Button>

                        {/* Twitter Login */}
                        <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 px-4 py-2">
                            <Icon name="twitter" className="text-blue-400 text-2xl" />
                        </Button>
                    </div>
                </div>

                {/* Forgot Password Link */}
                <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-blue-500 hover:underline">
                        Forgot your password?
                    </a>
                </div>

                {/* Registration Link */}
                <div className="registration text-center mt-6">
                    <a href="/register" className="text-sm text-gray-600 hover:text-blue-500">
                        New? <span className="font-semibold text-blue-600 hover:underline">Register</span>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
