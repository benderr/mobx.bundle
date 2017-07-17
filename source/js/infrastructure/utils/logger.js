export default {
	log(...props){
		if (__DEV__)
			console.log(...props);
	}
}