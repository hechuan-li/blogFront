const checkDevice = {
	getDevice: (currentWidth) => {
		if (currentWidth >= 750) {
			console.log('pc')
			return 'pc'
		} else if (currentWidth < 750) {
			console.log('pc')
			return 'mobile'
		}
	},
// 	getResize: () => {
// 	window.onresize = () => {
// 		let currentWidth = document.body.clientWidth
// 		if (currentWidth >= 750) {
// 			console.log('pc')
// 			return 'pc'
// 		} else if (currentWidth < 750) {
// 			return 'mobile'
// 		}
// 	}
// }
}

export default checkDevice

