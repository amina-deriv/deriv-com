import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import type { ImageDataLike } from 'gatsby-plugin-image'
import { Flex, Container, Show } from 'components/containers'
import { Header } from 'components/elements'
import { localize } from 'components/localization'
import { Background } from 'components/elements/background-image'
import { LinkButton } from 'components/form'
import device from 'themes/device.js'

const BackgroundWrapper = styled(Background)`
    background-size: cover;
    background-position: bottom right;
`

const Wrapper = styled(Container)`
    @media ${device.tabletS} {
        margin-left: 0;
        padding: 2rem 16px 0;
        flex-direction: column-reverse;
        justify-content: center;
    }
`

const InformationWrapper = styled(Flex)`
    width: 100%;
    max-width: 75rem;
    z-index: 1;

    @media ${device.tabletL} {
        max-width: 55rem;
        top: 280px;
        padding: 0 16px;
    }
    @media ${device.mobileL} {
        max-width: 328px;
        padding: 0;
    }
`

const StyledHeader = styled(Header)`
    display: flex;

    @media ${device.tabletL} {
        margin-top: 1.3rem;
    }
    @media ${device.mobileS} {
        margin-top: 0;
    }
`

const HeroContent = styled(Flex)`
    height: unset;

    ${Header} {
        display: flex;
        margin-top: 1rem;
    }

    @media ${device.mobileL} {
        ${Header} {
            margin: 10px 0 0;
        }
    }
`

const TryButton = styled(LinkButton)`
    padding: 17px 24px;
    width: min-content;
    white-space: nowrap;
    font-size: 18px;
    border: unset;

    @media ${device.tablet} {
        padding: 14px 18px;
        font-size: 14px;
        margin-top: 40px;
        font-weight: 700;
    }
    @media ${device.mobileL} {
        margin-top: 20px;
    }
    @media ${device.mobileS} {
        margin-top: 10px;
    }
`
const query = graphql`
    query {
        p2p_hero_background: file(relativePath: { eq: "landing/trade-fx.jpg" }) {
            ...fadeIn
        }
        p2p_hero_background_mobile: file(relativePath: { eq: "landing/trade-fx-m.jpg" }) {
            ...fadeIn
        }
    }
`
type HeroDataProps = {
    title: string
    content: ReactElement
}
type HeroComponentProps = {
    title: string
    content: ReactElement
    background_data: ImageDataLike
}

const HeroComponent = ({ title, content, background_data }: HeroComponentProps) => {
    return (
        <BackgroundWrapper data={background_data}>
            <Wrapper p="0" justify="space-between" height="63rem">
                <InformationWrapper height="unset" direction="column">
                    <StyledHeader mt="4rem" type="hero" color="white">
                        {title}
                    </StyledHeader>
                    <HeroContent m="2rem 0 0" direction="column" justify="flex-start">
                        <Header as="h2" color="white" type="subtitle-1" weight="normal">
                            {content}
                        </Header>
                    </HeroContent>
                    <TryButton
                        m="4.2rem 0 80px"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        type="submit"
                        secondary="true"
                        to={'/signup/'}
                    >
                        {localize('Start trading')}
                    </TryButton>
                </InformationWrapper>
            </Wrapper>
        </BackgroundWrapper>
    )
}

const Hero = ({ title, content }: HeroDataProps) => {
    const data = useStaticQuery(query)

    return (
        <div>
            <Show.Desktop min_width="800">
                <HeroComponent
                    title={title}
                    content={content}
                    background_data={data['p2p_hero_background']}
                />
            </Show.Desktop>
            <Show.Mobile>
                <HeroComponent
                    title={title}
                    content={content}
                    background_data={data['p2p_hero_background_mobile']}
                />
            </Show.Mobile>
        </div>
    )
}

export default Hero
