import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

export default function CarouselItems() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            slidesToSlide: 3
        },
        mobile: {
            breakpoint: { max: 767, min: 464 },
            items: 1,
            slidesToSlide: 1
        }
    };

    const CustomRight = ({ onClick }) => (
        <button className="absolute right-0 bg-[#e53170] rounded-full" onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-right-square-fill h-[60px] md:h-[50px]" viewBox="0 0 16 16">
                <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
            </svg>
        </button>
    );
    const CustomLeft = ({ onClick }) => (
        <button className="absolute left-0 bg-[#e53170] rounded-full" onClick={onClick} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-square-fill h-[60px] md:h-[50px]" viewBox="0 0 16 16">
                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
            </svg>
        </button>
    );

    const sliderInfo = [
        {
            name: 'Audio, video, foto',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2.5 24 24" height="130" fill="currentColor">
                <path d="M4 11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H4zm9.698.473l1.888-1.887A2 2 0 0 1 17 9h.586a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H17a2 2 0 0 1-1.414-.586l-1.888-1.887A4.001 4.001 0 0 1 10 19H4a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4h6a4.001 4.001 0 0 1 3.698 2.473zM17 17h.586v-6H17l-3 3 3 3zM9.259 2.379a4.5 4.5 0 1 1-.386 5.785 5 5 0 1 1 .386-5.785zM5 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
            </svg>
        },
        {
            name: 'Filatelija',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="130" fill="currentColor" className="bi bi-postage" viewBox="0 0 16 16">
                <path d="M4.75 3a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75v-8.5a.75.75 0 0 0-.75-.75zM11 12H5V4h6z" />
                <path d="M3.5 1a1 1 0 0 0 1-1h1a1 1 0 0 0 2 0h1a1 1 0 0 0 2 0h1a1 1 0 1 0 2 0H15v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1h-1.5a1 1 0 1 0-2 0h-1a1 1 0 1 0-2 0h-1a1 1 0 1 0-2 0h-1a1 1 0 1 0-2 0H1v-1a1 1 0 1 0 0-2v-1a1 1 0 1 0 0-2V9a1 1 0 1 0 0-2V6a1 1 0 0 0 0-2V3a1 1 0 0 0 0-2V0h1.5a1 1 0 0 0 1 1M3 3v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1" />
            </svg>
        },
        {
            name: 'Film i glazba',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" height="130" fill="currentColor">
                <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm7-8a6.99 6.99 0 0 1-2.89 5.666l-.53-.796L13 14a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4l1.2-1.6A6.99 6.99 0 0 1 17 10zm-7 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
            </svg>
        },
        {
            name: 'Graditeljstvo i alati',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 24 24" height="130" fill="currentColor">
                <path d="M2 8.654l2.813 2.822 6.332-6.35-2.814-2.823-6.332 6.35zm4.441 8.128l2.11-2.117a.993.993 0 0 1 1.408 0 1 1 0 0 1 0 1.411l-2.11 2.117a1 1 0 0 1 0 1.411L6.44 21.015a.993.993 0 0 1-1.407 0l-1.407-1.41a1 1 0 0 1 0-1.412l1.407-1.411a.993.993 0 0 1 1.407 0zm9.146-6.35l6.331-6.35-1.407-1.412-6.331 6.35c-.777-.78-.912-1.907-.302-2.52L19.406.956c.61-.612 1.735-.477 2.512.303l1.407 1.41c.778.78.913 1.909.302 2.52l-5.528 5.545c-.61.612-1.735.477-2.512-.303zm-.924 3.866L9.738 9.36l-.704.706 4.925 4.939.704-.706zm1.407 1.412l-.704.705 1.759 1.764c.194.195.51.195.703 0a.5.5 0 0 0 0-.705L16.07 15.71zM2.06 5.77a1.5 1.5 0 0 1 .291-1.704l1.407-1.41a1.49 1.49 0 0 1 1.699-.293L6.924.892a1.986 1.986 0 0 1 2.814 0l2.814 2.823a2 2 0 0 1 0 2.822l-1.407 1.411 8.09 8.114a2.5 2.5 0 0 1 0 3.528 2.482 2.482 0 0 1-3.517 0l-8.09-8.114-1.408 1.411c-.777.78-2.037.78-2.814 0L.592 10.065a2 2 0 0 1 0-2.823l1.467-1.47z"></path>
            </svg>
        },
        {
            name: 'Knjige i tisak',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -2 24 24" height="130" fill="currentColor">
                <path d="M3 0h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm2 13h2a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm6-12a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 6h6a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm0-3h6a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm.5-6h2A1.5 1.5 0 0 1 9 4.5v2A1.5 1.5 0 0 1 7.5 8h-2A1.5 1.5 0 0 1 4 6.5v-2A1.5 1.5 0 0 1 5.5 3z"></path>
            </svg>
        },
        {
            name: 'Kolekcionarstvo',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="130" fill="currentColor" className="bi bi-collection" viewBox="0 0 16 16">
                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z" />
            </svg>
        },
        {
            name: 'Kozmetika i zdravlje',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="130" fill="currentColor" className="bi bi-brush" viewBox="0 0 16 16">
                <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z" />
            </svg>
        },
        {
            name: 'Kuća, ured i vrt',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" height="130" fill="currentColor">
                <path d="M18 18V7.132l-8-4.8-8 4.8V18h4v-2.75a4 4 0 1 1 8 0V18h4zm-6 2v-4.75a2 2 0 1 0-4 0V20H2a2 2 0 0 1-2-2V7.132a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.132V18a2 2 0 0 1-2 2h-6z"></path>
            </svg>
        },
        {
            name: 'Numizmatika',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" height="130" fill="currentColor">
                <path d="M9 13v-2a3 3 0 1 1 0-6V4a1 1 0 1 1 2 0v1h.022A2.978 2.978 0 0 1 14 7.978a1 1 0 0 1-2 0A.978.978 0 0 0 11.022 7H11v2a3 3 0 0 1 0 6v1a1 1 0 0 1-2 0v-1h-.051A2.949 2.949 0 0 1 6 12.051a1 1 0 1 1 2 0 .95.95 0 0 0 .949.949H9zm2 0a1 1 0 0 0 0-2v2zM9 7a1 1 0 1 0 0 2V7zm1 13C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
            </svg>
        },
        {
            name: 'Odjevni predmeti',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="130" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
                <path fill="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5" />
            </svg>
        },
        {
            name: 'Računala',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -4 24 24" height="130" fill="currentColor">
                <path d="M1 14h18a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2zM2 0h16a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a2 2 0 0 1 2-2zm16 11V2H2v9h16z">
                </path>
            </svg>
        },
        {
            name: 'Satovi i nakit',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -1 24 24" height="130" fill="currentColor">
                <path d="M9 10h2a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v3zM4 4.07V3a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1.07A7.997 7.997 0 0 1 16 11a7.997 7.997 0 0 1-4 6.93V19a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1.07A7.997 7.997 0 0 1 0 11a7.997 7.997 0 0 1 4-6.93zm2-.818A8.014 8.014 0 0 1 8 3c.69 0 1.36.088 2 .252V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v.252zm0 15.496V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.252a8.047 8.047 0 0 1-4 0zM8 17A6 6 0 1 0 8 5a6 6 0 0 0 0 12z"></path>
            </svg>
        },
        {
            name: 'Sport',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" height="130" fill="currentColor"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path><path d="M5 10c0-1.71-.538-3.329-1.5-4.666A7.967 7.967 0 0 0 2 10c0 1.71.538 3.329 1.5 4.666A7.967 7.967 0 0 0 5 10zm-5 0a9.978 9.978 0 0 1 3.5-7.6A9.978 9.978 0 0 1 7 10a9.978 9.978 0 0 1-3.5 7.6A9.978 9.978 0 0 1 0 10zm15 0c0 1.71.538 3.329 1.5 4.666A7.967 7.967 0 0 0 18 10c0-1.71-.538-3.329-1.5-4.666A7.967 7.967 0 0 0 15 10zm5 0a9.978 9.978 0 0 1-3.5 7.6A9.978 9.978 0 0 1 13 10a9.978 9.978 0 0 1 3.5-7.6A9.978 9.978 0 0 1 20 10z"></path><path d="M11 9h8v2h-8v8H9v-8H1V9h8V1h2v8z"></path></svg>
        },
        {
            name: 'Sve za djecu',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="130" fill="currentColor" className="bi bi-scooter" viewBox="0 0 16 16">
                <path fill="evenodd" d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-.39l1.4 7a2.5 2.5 0 1 1-.98.195l-.189-.938-2.43 3.527A.5.5 0 0 1 9.5 13H4.95a2.5 2.5 0 1 1 0-1h4.287l2.831-4.11L11.09 3H9.5a.5.5 0 0 1-.5-.5M3.915 12a1.5 1.5 0 1 0 0 1H2.5a.5.5 0 0 1 0-1zm8.817-.789A1.499 1.499 0 0 0 13.5 14a1.5 1.5 0 0 0 .213-2.985l.277 1.387a.5.5 0 0 1-.98.196z" />
            </svg>
        },
        {
            name: 'Telekomunikacija',
            icon: <svg xmlns="http://www.w3.org/2000/svg" height="130" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
            </svg>
        },
        {
            name: 'Umjetnine',
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -2 24 24" height="130" fill="currentColor">
                <path d="M14 8.322V2H2v12h3.576l3.97-5.292A3 3 0 0 1 14 8.322zm0 3.753l-1.188-2.066a1 1 0 0 0-1.667-.101L8.076 14H14v-1.925zM14 16H2v2h12v-2zM2 0h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm4 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
            </svg>
        }
    ]

    return (
        <div className='text-[1.5rem] w-full'>
            <p className='text-[2.3rem] mb-2'>KATEGORIJE:</p>
            <Carousel
                responsive={responsive}
                autoPlay={false}
                swipeable={true}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
                customRightArrow={<CustomRight />}
                customLeftArrow={<CustomLeft />}
                className="max-w[300px] min-width-[300px]"
            >
                {sliderInfo.map((slide, index) => {
                    return (
                        <div key={index} className='flex flex-col items-center place-content-center border-solid border-1 border-black rounded-lg h-[15rem] m-[1rem] cursor-pointer card hover:text-white hover:bg-[#0f0e17]'>
                            {slide.icon}
                            <p>{slide.name}</p>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    )
}
