import React from 'react';
import type { SolutionResult } from '../types/matrix';
import { matrixToLatex } from '../utils/mathFormatter';
import LaTeXRenderer from './LaTeXRenderer';

interface SolutionDisplayProps {
    solution: SolutionResult;
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution }) => {
    // Handle error case (singular matrix or other errors)
    if (solution.error) {
        return (
            <div className="solution-display" style={{ textAlign: 'center', padding: '40px' }}>
                <h2 style={{ color: '#ff6b6b', marginBottom: '20px' }}>⚠️ Error</h2>
                <div style={{ 
                    backgroundColor: '#f5f5f5',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    padding: '25px',
                    minHeight: '150px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
                        {solution.error}
                    </p>
                    <p style={{ marginTop: '20px', color: '#333' }}>
                        {solution.error === 'The matrix is singular' 
                            ? 'This matrix has no inverse because its determinant is zero.'
                            : 'Please check your input and try again.'}
                    </p>
                </div>
            </div>
        );
    }

    // Handle success case (matrix has inverse)
    if (!solution.finalMatrix) {
        return null; // Don't render anything if no matrix
    }

    return (
        <div className="solution-display" style={{ padding: '40px 0' }}>
            <h2 style={{ color: '#4caf50', marginBottom: '20px', textAlign: 'center' }}>
                ✅ Final Result - Inverse Matrix
            </h2>
            <div style={{ 
                backgroundColor: '#f5f5f5',
                border: '2px solid #ddd',
                borderRadius: '8px',
                padding: '25px',
                minHeight: '150px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ 
                    fontSize: '18px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <LaTeXRenderer latex={matrixToLatex(solution.finalMatrix)} />
                </div>
            </div>
        </div>
    );
};

export default SolutionDisplay;