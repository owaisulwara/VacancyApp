import PushNotification from 'react-native-push-notification'

export const LocalNotification = (title,message) => {


    PushNotification.localNotification({

        autoCancel: true,
        title: 'New Message from VacansySL',
        message: title,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        color:'red',
    })

}
