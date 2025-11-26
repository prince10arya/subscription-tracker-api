import { createRequire } from 'module'
import dayjs from 'dayjs'
import Subscription from '../models/subscription.model.js'
const require = createRequire(import.meta.url)
const { serve } = require('@upstash/workflow/express')

const REMINDERS = [ 7, 5, 2, 1];
const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active' ) return;
    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs()))
    {
        console.log(`Renewl date has passed for subscription ${ subscriptionId }. Stopping workflow. `);
        return;
    }
    for(const daysBefore of REMINDERS)
    {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }
        await triggerReminder(context, `Remider ${daysBefore} days before`);
    }

});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email')
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleepind Until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`); 
        // Send Email, SMS, push notification...
    })
}
export default sendReminders;