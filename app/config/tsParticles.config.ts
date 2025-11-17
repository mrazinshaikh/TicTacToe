const config = {
    fullScreen: { zIndex: 1 },
    particles: {
        number: { value: 0 },
        color: { value: ['#00FFFC', '#FC00FF', '#fffc00'] },
        shape: {
            type: 'image',
            options: {
                image: [
                    {
                        src: '/assets/images/fruits/apple.png',
                        width: 32,
                        height: 32,
                        particles: {
                            size: { value: 16 },
                        },
                    },
                    {
                        src: '/assets/images/fruits/avocado.png',
                        width: 32,
                        height: 32,
                        particles: { size: { value: 16 } },
                    },
                    {
                        src: '/assets/images/fruits/banana.png',
                        width: 32,
                        height: 32,
                        particles: {
                            size: { value: 16 },
                        },
                    },
                    {
                        src: '/assets/images/fruits/berries.png',
                        width: 32,
                        height: 32,
                        particles: { size: { value: 16 } },
                    },
                    {
                        src: '/assets/images/fruits/cherry.png',
                        width: 32,
                        height: 32,
                        particles: {
                            size: { value: 16 },
                        },
                    },
                    {
                        src: '/assets/images/fruits/grapes.png',
                        width: 32,
                        height: 32,
                        particles: { size: { value: 16 } },
                    },
                    {
                        src: '/assets/images/fruits/lemon.png',
                        width: 32,
                        height: 32,
                        particles: {
                            size: { value: 16 },
                        },
                    },
                    {
                        src: '/assets/images/fruits/orange.png',
                        width: 32,
                        height: 32,
                        particles: { size: { value: 16 } },
                    },
                    {
                        src: '/assets/images/fruits/peach.png',
                        width: 32,
                        height: 32,
                        particles: {
                            size: { value: 16 },
                        },
                    },
                    {
                        src: '/assets/images/fruits/pear.png',
                        width: 32,
                        height: 32,
                        particles: { size: { value: 16 } },
                    },
                    {
                        src: '/assets/images/fruits/pepper.png',
                        width: 32,
                        height: 32,
                        particles: {
                            size: { value: 16 },
                        },
                    },
                    {
                        src: '/assets/images/fruits/plum.png',
                        width: 32,
                        height: 32,
                        particles: { size: { value: 16 } },
                    },
                    {
                        src: '/assets/images/fruits/star.png',
                        width: 32,
                        height: 32,
                        particles: { size: { value: 16 } },
                    },
                    {
                        src: '/assets/images/fruits/strawberry.png',
                        width: 32,
                        height: 32,
                        particles: { size: { value: 16 } },
                    },
                    {
                        src: '/assets/images/fruits/watermelon.png',
                        width: 32,
                        height: 32,
                        particles: {
                            size: { value: 16 },
                        },
                    },
                    {
                        src: '/assets/images/fruits/watermelon_slice.png',
                        width: 32,
                        height: 32,
                        particles: { size: { value: 16 } },
                    },
                ],
            },
        },
        opacity: {
            value: {
                min: 0,
                max: 1,
            },
            animation: { enable: true, speed: 2, startValue: 'max', destroy: 'min' },
        },
        size: { value: { min: 2, max: 4 } },
        links: { enable: false },
        life: {
            duration: { sync: true, value: 5 },
            count: 1,
        },
        move: {
            enable: true,
            gravity: {
                enable: true,
                acceleration: 10,
            },
            speed: { min: 10, max: 20 },
            decay: 0.1,
            direction: 'none',
            straight: false,
            outModes: { default: 'destroy', top: 'none' },
        },
        rotate: {
            value: { min: 0, max: 360 },
            direction: 'random',
            move: true,
            animation: { enable: true, speed: 60 },
        },
        tilt: {
            direction: 'random',
            enable: true,
            move: true,
            value: {
                min: 0,
                max: 360,
            },
            animation: { enable: true, speed: 60 },
        },
        roll: {
            darken: {
                enable: true,
                value: 25,
            },
            enable: true,
            speed: { min: 15, max: 25 },
        },
        wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: { min: -15, max: 15 },
        },
    },
    emitters: {
        life: { count: 0, duration: 0.1, delay: 0.4 },
        rate: { delay: 0.1, quantity: 150 },
        size: { width: 0, height: 0 },
    },
};

export default config;
