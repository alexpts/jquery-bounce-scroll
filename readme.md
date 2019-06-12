#jquery bounce scroll

Plugin work only vertical scroll


Simple example:
```javascript
$('body').bounceScroll({
    bounceDistance: 50,
    animDuration: "260ms",
    animEasing: "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
});
```


Throttle function for scroll event:
```javascript
$('body').bounceScroll({
    throttle: function(handler, ms) {
        // ... some throttle function
    },
    throttleTime: 50 // ms
});
```


Semaphore lock:
```javascript
let lockObject = {
    lock: true,
	isLock: function() { // semaphore must implement method `isLock`
        return this.lock;
    }
};

$('body').bounceScroll({
    semaphore: lockObject
});
```