import { invitationData } from '@/data/invitation';
import { InvitationClient } from '@/components/InvitationClient';

export default function Page() {
    return <InvitationClient data={invitationData} />;
}
