document.addEventListener('readystatechange', event => {
	if (event.target.readyState === "interactive") {
        console.log('loading');
        
		// initLoader();
	} else if (event.target.readyState === "complete") {
        console.log('complete');
        
		// initApp();
	}
});