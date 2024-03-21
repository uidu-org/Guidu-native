import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, Text, TouchableOpacity, View } from '../../AppComponents'
import CustomHeader from '../../Components/CustomHeader'
import {
    getAllPosts,
    getFlaggedPosts
} from '../../Services/post'
import { setIsLoading } from '../../Store/Loader'

import { Dimensions, Platform } from 'react-native'
import {
    DataProvider,
    LayoutProvider, RecyclerListView
} from 'recyclerlistview'
import config from '../../../config'
import { randomString, screenHeight } from '../../Lib/utils'
import Socket from '../../Socket'
import {
    addNewFeed,
    addRealTimeNewFeed,
    setFeed
} from '../../Store/FeedStore'
import { setFlaggedPost } from '../../Store/FlaggedStore'
import { h14_SemiBold } from '../../Theme/Fonts'
import { calculateHeight, preLoadImages } from '../../Utils/EndPointApi'
import { s, screenWidth, vs } from '../../Utils/Scale'
// import { FlatList } from 'react-native-gesture-handler'
import uuid from 'uuid/v4'

let skip = 0
let _count = 0
let subscribedSocket = false
let test=[]
const Feed = props => {
const socket = useRef(()=>Socket({ socketUrl: config.SOCKET_URL })).current()
const { navigation } = props
const skeleton = Array(5).fill(0)
const [realTimeFeed, setRealTimeFeed] = useState([])
const [refreshing, setRefreshing] = useState(false)
const [reload, setReload] = useState(false)
const user = useSelector(state => state?.user.user)
const token = useSelector(state => state?.user.token)
const feeds = useSelector(state => state?.feed.feeds)
const flaggeds = useSelector(state => state?.flaggedPost.flaggeds)
const dispatch = useDispatch()
const flatRef = useRef()

const socketSubId =useMemo(()=>{
return user?._id || randomString()
},[])

const onRefresh = useCallback(() => {
setRealTimeFeed([])
skip = 0
getFeeds({ storePre: false, flaggeds })
skip = skip + 20
}, [flaggeds, user])

useEffect(() => {
dispatch(setIsLoading({ isLoading: false }))
subscribedSocket = false
skip = 0
console.log('>>>>>>>>>>>...useEffect Feed')
flatRef &&
flatRef.current &&
flatRef.current.scrollToOffset({ animated: true, offset: 0 })
dispatch(getFlaggedPosts({ user: user?._id, token }))
.then(res => {
const tempFlaggeds = res.reduce((acc, item) => {
acc[item?.post?._id] = 1
return acc
}, {})
dispatch(setFlaggedPost({ flaggeds: tempFlaggeds }))
if (_count >= skip) {
skip = 0
getFeeds({ storePre: false, flaggeds: tempFlaggeds })
skip = skip + 20
}
})
.catch(err => {
console.log(
'🚀######### ~ file: index.js ~ line 80 ~get falgge Post ~ err',
err,
)
})
return () => {
socket.unsubscribe({
subscriptionId: socketSubId,
props: { model: 'Post' },
})
subscribedSocket = false
setRealTimeFeed([])
}
}, [reload, user])

useEffect(() => {
if (feeds.length) {
filterPosts({ posts: feeds, storePre: false, flaggeds })
}
}, [flaggeds])

const filterPosts = async ({
posts,
storePre = true,
flaggeds: tempFlaggeds,
}) => {
const totalFlagged = tempFlaggeds || flaggeds
const filteredPosts = posts.filter(item => {
if (!totalFlagged?.[item?._id?.toString()] == 1) {
return true
} else {
return false
}
})

if (!filteredPosts?.length) {
  if (_count >= skip && skip >= 20) {
    getFeeds({ storePre, flaggeds: totalFlagged })
    skip = skip + 20
  }
  return
}
if (storePre) {
  dispatch(
    addNewFeed({
      posts: JSON.stringify(filteredPosts),
    }),
  )
} else {
  dispatch(setFeed({ feeds: filteredPosts }))
}
}

const getFeeds = async ({ storePre = true, flaggeds } = {}) => {
console.log('>>>>>>>>>>>>..calling server')
await dispatch(getAllPosts({ token, user, skip }))
.then(async res => {
_count = res?.aggregates?._count || 0
preLoadImages({ data: res?.result, token })
const calcPosts = await calculateHeight(res?.result)
filterPosts({ posts: calcPosts, storePre, flaggeds: flaggeds })
!subscribedSocket && subscribeSocket(res)
})
.catch(err => {
console.log(
'🚀######### ~ file: index.js ~ line 131 ~ awaitdispatch ~ err',
err,
)
})
}

useEffect(() => {
return () => {
socket.unsubscribe({
subscriptionId: socketSubId,
props: { model: 'Post' },
})
subscribedSocket = false
}
}, [])

const subscribeSocket = res => {
console.log('>>>>>>>>>>>>>Subcribinggg')
let uri = {
id: '_find',
props: {
query: {
id: 'getAllPosts',
addOnFilter: {
...(user?.groups
? {
groups: {
_id: { $in: user.groups.map(item => item._id) },
},
}
: {}),
},
metadata: true,
},
model: 'Post',
subscribe: true,
},
}
subscribedSocket = true
socket.subscribe({
uid: socketSubId,
uri,
res,
callback: onRealTimeUpdate,
token: token,
})
}

const onRealTimeUpdate = event => {
if (event) {
if (event.insert && event.uid == socketSubId) {
if (event?.insert?.createdBy?._id != user?._id) {
skip = skip + 1
console.log('>>>>>>>>>>>...increing skip')
setRealTimeFeed(pre => {
let included = pre.findIndex(
item => item?._id == event?.insert?._id,
)
if (included == -1) {
return [event.insert || {}, ...pre]
} else {
return pre
}
})
}
} else if (event.update) {
console.log('>>>>>>>>>>>>>.update', user.name)
}
}
}
const updateRealTimeFeed = () => {
dispatch(addRealTimeNewFeed({ posts: JSON.stringify(realTimeFeed) }))
setRealTimeFeed([])
flatRef &&
flatRef.current &&
flatRef.current.scrollToOffset({ animated: true, offset: 0 })
}

const renderItem = useCallback(({ item, index }) => {
return
}, [flatRef])

const refreshControl =

const getStableId=(index) => {

let data =dataProvider.getDataForIndex(index);
return data?._id||uuid();
}

const dataProvider=()=>new DataProvider((r1, r2) => {
return true
if(r1?._id?.toString() === r2?._id?.toString()){
return r1?.likes?.length!==r2?.likes?.length
}
return r1?._id?.toString() !== r2?._id?.toString()

}).cloneWithRows(feeds)
// ,index=>feeds?.[index]?._id||index+'piyush'

// console.log("🚀######### ~ file: FeedTest.js ~ line 282 ~ Feed ~ feeds", JSON.stringify(feeds));
// console.log("🚀######### ~ file: FeedTest.js ~ line 238 ~ dataProvider ~ test", test);

let { height, width } = Dimensions.get('window')
const _layoutProvider = useMemo(()=>new LayoutProvider(
i => {
return { item: dataProvider.getDataForIndex(i), index: i }
},
async ({ item, index }, dim) => {
let height = 85
dim.width = width

  if (item?.images?.length || (item?.ogImage && item?.ogImage?.url)) {
    height = height  + s(160)
  }

  height =height + (item?.titleHeight+10 || 0) + (item?.link ? vs(20) : 0)

  if (item?.contentHeight) {
    if (item?.contentHeight >= vs(43)) {
      height = height + vs(55)
    } else {
      height = height + (item?.contentHeight || 0)
    }
  }
  height = height + 12 + 34 + 80+5+6
  dim.height = height

},
),[dataProvider])
_layoutProvider.shouldRefreshWithAnchoring = false

const onEndReached = () => {
if (_count >= skip && skip >= 20) {
getFeeds()
skip = skip + 20
}
}

return (
<View style={{ backgroundColor: '#fff', flex: 1,zIndex:9999 }}>
<CustomHeader
backIconFunc={() => {
skip = 0
navigation.goBack(null)
}}
groupFunc={() => {
navigation.navigate('Groups', { canGoback: true })
}}
addPostFunc={() => {
navigation.navigate('CreatePost', { setReload, canGoback: true })
}}
/>
{realTimeFeed.length ? (
<TouchableOpacity
style={{
backgroundColor: '#FEF2DC',
position: 'absolute',
left: screenWidth * 0.4,
top: 60,
padding: 10,
zIndex: 9999,
borderRadius: 50,
alignItems: 'center',
paddingBottom: 12,
paddingHorizontal: 18,
}}
onPress={updateRealTimeFeed}
elevation={10}
>
<Text
style={{
color: '#001A21',
...h14_SemiBold,
...(Platform.OS == 'ios' ? { marginTop: 7 } : {}),
}}
>
New Feed


) : null}
{feeds && feeds.length ? (
<RecyclerListView

    ref={flatRef}
      style={{ flexGrow:1,}}
      rowRenderer={renderItem}
      dataProvider={dataProvider}
      layoutProvider={_layoutProvider}
      onEndReached={onEndReached}
      onEndReachedThreshold={5000}
      refreshControl={refreshControl}
      renderFooter={renderFooter}
      // forceNonDeterministicRendering={true}
      renderAheadOffset={6000}
      // disableRecycling={true}
      decelerationRate={Platform.OS == 'ios' ? 0.995 : 0.97}
      optimizeForInsertDeleteAnimations={true}
      suppressBoundedSizeException={true}
      onRecreate={par=>console.log(">>>>>>>>>>>>par",par)}

    />
// <FlashList
// renderItem={renderItem}
// keyExtractor={keyExtractor}
// onEndReached={onEndReached}
// refreshControl={refreshControl}

// onEndReachedThreshold={10}
// estimatedItemSize={500}
// drawDistance={5000}
// ListFooterComponent={()=>renderFooter()}
// decelerationRate={Platform.OS == 'ios' ? 0.995 : 0.97}
// removeClippedSubviews

// data={feeds}
// />
) : (
skeleton.map((item, index) => )
)}

)
}

const renderFooter = () => {

if (_count <= skip) {

return null
}
return (
<ActivityIndicator
size={'large'}
style={{ height: screenHeight * 0.3, backgroundColor: '#fff' }}
color={'#ccc'}
/>
)
}
const keyExtractor = item => item?._id

export default Feed