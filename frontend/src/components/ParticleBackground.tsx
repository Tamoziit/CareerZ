import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
    const particlesInit = async (main: any) => {
        await loadFull(main);
    };

    const particlesLoaded = async (container: any) => {

        console.log(container);
    };

    return (
        <div className="relative w-full h-full">
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    particles: {
                        number: {
                            value: 100,
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                        },
                        color: {
                            value: "#ffffff",
                        },
                        shape: {
                            type: "circle",
                        },
                        opacity: {
                            value: 0.5,
                            anim: {
                                enable: true,
                                speed: 1,
                                opacity_min: 0.1,
                            },
                        },
                        size: {
                            value: 3,
                            anim: {
                                enable: true,
                                speed: 40,
                                size_min: 0.1,
                            },
                        },
                        links: {
                            enable: true,
                            distance: 150,
                            color: "#ffffff",
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 6,
                            direction: "none",
                            random: true,
                            straight: false,
                            outModes: {
                                default: "out",
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default ParticleBackground;