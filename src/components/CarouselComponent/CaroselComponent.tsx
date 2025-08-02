import { useState, useEffect, useMemo, useCallback } from "react";
import ImageComponent from "../imageComponent/ImageComponent";
import "./CaroselComponent.css";

export default function CarouselComponent() {
    // Dados de exemplo expandidos
    const items = useMemo(() => [
        {
            id: 1,
            image: 'https://lh3.googleusercontent.com/pw/AP1GczM6Ot_Gg6tQzMnZbAQ9mhBHDgeaf7XWVUO3mh2L1BCFfR9f4esTgCAHcoTBlUOVzpBJOHbkrJoTWTwOYNTvoupocL1tJGIoYks_beyu7cWIbDV_ee5J8PWFOaHzXzqOErStScxtvRYycqjzCceHqp9INQ=w349-h621-s-no-gm?authuser=0',
            altText: 'Imagem Dela',
            text: 'Hoje é um dia que posso dedicar a melhor coisinha linda, perfeita e maravilhosa que apareceu na minha vida. Essa gostosa na foto ali hehe'
        },
        {
            id: 2,
            image: 'https://lh3.googleusercontent.com/pw/AP1GczOFuXJfygp9KHg-1ICS30oCf-R1OFS1BGOScSxhg310kRhB5p5HJkpycOtHWpcb5kVQ6zSqZuo9ZDOCMnJzd0m2LHSD_nH2hNEQRrrz1BOmyHcQwAPvobSsS3ULJeP_rMge9aEmB4YCsOMycLnxWdMj9A=w468-h621-s-no-gm?authuser=0',
            altText: 'Ela sentadinha',
            text: 'Quanto mais te conheço, mais eu vou me apaixonando. Os momentos que passamos juntos até agora são os melhores da minha vida.'
        },
        {
            id: 3,
            image: 'https://lh3.googleusercontent.com/pw/AP1GczPQ9xj2IAItd-FpRgDnHdmyaLTk3EDl5kG8TDLlUBtVY5wTn82ABkZc66yWqnQKm_1UJ5JEyHI5IaiKj5V6D0UxaP6LqTcRj2S1dLXKdGJuuC8PYGVU24hhAUfiohltZnu80jQVoqII86fR_zAaBzeWRQ=w468-h621-s-no-gm?authuser=0',
            altText: 'Ela toda meiga linda',
            text: 'Eu te amo. Amo muito. Independete do que você ache, para mim você é a mais linda. É aquela que com um leve sorriso faz meu coração aquecer e me deixa super feliz.'
        },
        {
            id: 4,
            image: 'https://lh3.googleusercontent.com/pw/AP1GczN_peZ9d-yUCMwvo5J5snm4L3AgfVas4bLzOxYtePIgj-bGxDEhhRe4MJVSCWvzMSwCQs3TPhYBTvGbw1MVqVHGa4M7DuylltLO9VEr3eL1FdNUBhq7A3BN3gYwYB6W85D1xUPwQXeqQEcAR4NDBvSxlg=w468-h621-s-no-gm?authuser=0',
            altText: 'Ela Bruxinha',
            text: 'Como se não bastasse ser a mais linda do mundo, ainda consegue ser a mais fofa e muito, mas muito mesmo, divertida e engraçada.'
        },
        {
            id: 5,
            image: 'https://lh3.googleusercontent.com/pw/AP1GczNpMaqEAmp3cKkTquKmbsA9qliNuoxklhHEFn9nyt_79ru2J0CIpcgvJ_BStcq47wzVHOzLoE5ZjrUJFDkbtePS0rAdmfjEam9i33KBayAgHyfiX1sM7D8SJiU7grx_N3OY0cSEPi8kCb_Ht4as9GzJSg=w466-h621-s-no-gm?authuser=0',
            altText: 'Nois',
            text: 'Eu agradeço por cada momento que passamos juntos, por cada risada compartilhada e por cada briguinha que tivemos. Você é a melhor namorada que eu poderia ter. Te amo muito, minha linda.'
        }
    ], []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationDirection, setAnimationDirection] = useState<null | "left" | "right">(null);
    const [showHeartRain, setShowHeartRain] = useState(true);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

    // Pré-carregamento de todas as imagens
    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = items.map((item, index) => {
                return new Promise<number>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        setImagesLoaded(prev => new Set([...prev, index]));
                        resolve(index);
                    };
                    img.onerror = () => {
                        console.error(`Erro ao carregar imagem ${index + 1}:`, item.image);
                        reject(new Error(`Failed to load image ${index}`));
                    };
                    img.src = item.image;
                });
            });

            try {
                await Promise.allSettled(imagePromises);
                setAllImagesLoaded(true);
                console.log('Todas as imagens foram carregadas!');
            } catch (error) {
                console.error('Erro durante o carregamento das imagens:', error);
            }
        };

        preloadImages();
    }, [items]);

    // Chuva de corações no carregamento
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHeartRain(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    // // Auto-play funcionalidade
    // useEffect(() => {
    //     if (!isAutoPlaying || items.length <= 1) return;

    //     const interval = setInterval(() => {
    //         goToNext();
    //     }, 5000);

    //     return () => clearInterval(interval);
    // }, [currentIndex, isAutoPlaying, items.length]);

    const goToPrevious = useCallback(() => {
        if (animationDirection) return;
        
        setAnimationDirection('right');
        setIsAutoPlaying(false);
        
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === 0 ? items.length - 1 : prevIndex - 1
            );
            setAnimationDirection(null);
        }, 800);

        // Reativar auto-play após 10 segundos
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, [animationDirection, items.length]);

    const goToNext = useCallback(() => {
        if (animationDirection) return;
        
        setAnimationDirection('left');
        
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === items.length - 1 ? 0 : prevIndex + 1
            );
            setAnimationDirection(null);
        }, 800);
    }, [animationDirection, items.length]);

    const goToSlide = useCallback((index: number) => {
        if (animationDirection || index === currentIndex) return;
        
        const direction = index > currentIndex ? 'left' : 'right';
        setAnimationDirection(direction);
        setIsAutoPlaying(false);
        
        setTimeout(() => {
            setCurrentIndex(index);
            setAnimationDirection(null);
        }, 800);

        // Reativar auto-play após 10 segundos
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, [animationDirection, currentIndex]);

    const getPreviousIndex = useCallback(() => {
        return currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    }, [currentIndex, items.length]);

    const getNextIndex = useCallback(() => {
        return currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    }, [currentIndex, items.length]);

    // Suporte a teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === ' ') {
                e.preventDefault();
                setIsAutoPlaying(prev => !prev);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [goToPrevious, goToNext]);

    // Componente para a chuva de corações
    const HeartRain = () => {
        const hearts = useMemo(() => 
            Array.from({ length: 50 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 2,
                fontSize: 15 + Math.random() * 10,
                emoji: ['❤️', '💖', '💕', '💗', '💝'][Math.floor(Math.random() * 5)]
            }))
        , []);

        return (
            <div className="heart-rain">
                {hearts.map(heart => (
                    <div
                        key={heart.id}
                        className="heart"
                        style={{
                            left: `${heart.left}%`,
                            animationDuration: `${heart.duration}s`,
                            animationDelay: `${heart.delay}s`,
                            fontSize: `${heart.fontSize}px`,
                        }}
                    >
                        {heart.emoji}
                    </div>
                ))}
            </div>
        );
    };

    if (items.length === 0 || !allImagesLoaded) {
        return (
            <div className="carousel-container">
                <div className="carousel-loading">
                    <div className="loading-spinner"></div>
                    {items.length === 0 ? 'Carregando carrossel...' : `Carregando imagens... ${imagesLoaded.size}/${items.length}`}
                </div>
            </div>
        );
    }

    return (
        <>
            {showHeartRain && <HeartRain />}
            <div className="carousel-container">
                <button 
                    className="carousel-button prev-btn" 
                    onClick={goToPrevious}
                    disabled={!!animationDirection}
                    aria-label="Imagem anterior"
                >
                    ‹
                </button>
                
                <div className="carousel">
                    <div className="carousel-track">
                        {/* Imagem anterior (esquerda) */}
                        {items.length > 1 && (
                            <div className={`carousel-item prev ${
                                animationDirection === 'left' ? 'slide-out-far-left' : 
                                animationDirection === 'right' ? 'slide-in-from-left' : ''
                            }`}>
                                <ImageComponent 
                                    src={items[getPreviousIndex()].image}
                                    alt={items[getPreviousIndex()].altText}
                                />
                                <p className="carousel-text">{items[getPreviousIndex()].text}</p>
                            </div>
                        )}

                        {/* Imagem atual (centro) */}
                        <div className={`carousel-item current ${
                            animationDirection === 'left' ? 'slide-out-left' : 
                            animationDirection === 'right' ? 'slide-out-right' : ''
                        }`}>
                            <ImageComponent 
                                src={items[currentIndex].image}
                                alt={items[currentIndex].altText}
                            />
                            <p className="carousel-text">{items[currentIndex].text}</p>
                        </div>

                        {/* Próxima imagem (direita) */}
                        {items.length > 1 && (
                            <div className={`carousel-item next ${
                                animationDirection === 'left' ? 'slide-in-from-right' :
                                animationDirection === 'right' ? 'slide-out-far-right' : ''
                            }`}>
                                <ImageComponent 
                                    src={items[getNextIndex()].image}
                                    alt={items[getNextIndex()].altText}
                                />
                                <p className="carousel-text">{items[getNextIndex()].text}</p>
                            </div>
                        )}
                    </div>

                    {/* Indicadores */}
                    {items.length > 1 && (
                        <div className="carousel-indicators">
                            {items.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Ir para slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <button 
                    className="carousel-button next-btn" 
                    onClick={goToNext}
                    disabled={!!animationDirection}
                    aria-label="Próxima imagem"
                >
                    ›
                </button>

                {/* // Indicador de auto-play 
                {items.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        zIndex: 10
                    }}>
                        {isAutoPlaying ? '▶️ Auto' : '⏸️ Pausado'} | Espaço para pausar
                    </div>
                )}*/}
            </div>
        </>
    );
}