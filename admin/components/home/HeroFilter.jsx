import GlobalHeroFilter from "../common/GlobalHeroFilter";

const HeroFilter = () => {
    return (
        <div className="home_content">
            <div className="home-text text-center">
                <h2 className="fz55">Luxury & Aspirational</h2>
                <p className="fz18 color-white">
                Where Dreams Find Their Address
                </p>
            </div>
            {/* End .home-text */}

            <GlobalHeroFilter />
        </div>
    );
};

export default HeroFilter;
