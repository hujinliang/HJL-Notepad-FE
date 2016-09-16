/**
 * Created by jialao on 2016/9/16.
 */
import createLogger from 'vuex/logger'

export default process.env.NODE_ENV !== 'production'
            ?[createLogger()]
            :[]