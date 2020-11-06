const checkDevice = {
	getDevice: (currentWidth) => {
		if (currentWidth >= 750) {
			console.log('pc')
			return 'pc'
		} else if (currentWidth < 750) {
			console.log('pc')
			return 'mobile'
		}
	}
}

export default checkDevice

