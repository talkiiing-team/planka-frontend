const isNotificationsSupported = () => window.hasOwnProperty('Notification')

class NotificationService {
  allowNotifications: boolean

  constructor() {
    if (isNotificationsSupported()) {
      this.allowNotifications = Notification.permission === 'granted'
      Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status)
      })
      navigator.permissions
        .query({ name: 'notifications' })
        .then((notificationPerm) => {
          notificationPerm.onchange = () => {
            console.log(
              'User decided to change his settings. New permission: ' +
                notificationPerm.state
            )
            this.allowNotifications = notificationPerm.state === 'granted'
          }
        })
    } else {
      this.allowNotifications = false
    }
  }

  send = (text: string) => {
    if (false && this.allowNotifications) {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        reg !== undefined && reg
          ? reg.showNotification(text)
          : console.log("Notification isn't delivered")
      })
    }
  }
}

const notificationService = new NotificationService()

export { isNotificationsSupported, notificationService }
