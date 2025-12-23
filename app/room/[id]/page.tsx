import RoomClient from "@/app/components/rpg-components/viewer-components/room-client";

type RoomProps = {
  params: Promise<{ id: string }>;
};

export default async function Room({ params }: RoomProps) {
  const { id } = await params;

  return (
    <div>
      <RoomClient roomId={id}/>
    </div>
  )
}
