import Logo from '../../assets/logo.svg'

const isNotificationsSupported = () => window.hasOwnProperty('Notification')

class NotificationService {
  allowNotifications: boolean
  canNotify: boolean = false

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
    if (this.allowNotifications && this.canNotify) {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        console.log(Logo)
        reg !== undefined && reg
          ? reg.showNotification('planka.',{ body: text, icon: '/logo192.png' })
          : console.log("Notification isn't delivered")
      })
    }
  }
}

const notificationService = new NotificationService()

export { isNotificationsSupported, notificationService }
