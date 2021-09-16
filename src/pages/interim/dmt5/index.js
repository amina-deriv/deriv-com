import React from 'react'
import PropTypes from 'prop-types'
import Loadable from '@loadable/component'
import Everything from '../_everything'
import Hero from './_hero'
import { SEO } from 'components/containers'
import Layout from 'components/layout/layout'
import { localize, WithIntl } from 'components/localization'
const FAQ = Loadable(() => import('../_faq'))
const LoveTrading = Loadable(() => import('./_love-trading'))

const Interim = () => {
    return (
        <Layout type="interim" interim_type="dmt5">
            <SEO title={localize('Interim | DMT5')} no_index />
            <Hero />
            <Everything />
            <FAQ />
            <LoveTrading />
        </Layout>
    )
}

Interim.propTypes = {
    referrer: PropTypes.string,
}

export default WithIntl()(Interim)
