import "./ImageComponent.css";
import { useState } from "react";

interface ImageComponentProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ImageComponent({ src, alt, className = "" }: ImageComponentProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`image-container ${className}`}>
            {!isLoaded && !hasError && (
                <div className="loading-spinner"></div>
            )}
            <img
                src={src}
                alt={alt}
                className="carousel-image"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                }}
            />
            {hasError && (
                <div className="error-placeholder">
                    <span>❌ Erro ao carregar</span>
                </div>
            )}
        </div>
    );
}