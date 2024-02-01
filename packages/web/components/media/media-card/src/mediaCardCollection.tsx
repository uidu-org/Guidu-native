
import { Card, CardContent } from "@uidu/card-ui"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@uidu/carousel-ui"
import { Dialog, DialogContent, DialogPortal, DialogTrigger } from "@uidu/dialog-ui"

interface MediaCardProps {
    files: object[]
    onClickAction: (id: string) => void
}

export function MediaCardCollection({
    files,
    onClickAction
}: MediaCardProps) {


    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex overflow-x-auto overflow-y-hidden -webkit-overflow-scrolling-touch whitespace-nowrap pb-4 pt-4 mt-[-1rem] mb-[-1rem]">
                    {files.map((file, idx) => (
                        <Card key={idx}>
                            <img className="h-full w-full" src={file?.img} />
                        </Card>
                    ))}
                </div>
            </DialogTrigger>
            <DialogPortal>
                <DialogContent>
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full max-w-sm"
                    >
                        <CarouselContent className="h-[calc(100vh-6rem)]">
                            {files.map((file, idx) => (
                                <CarouselItem key={idx} className="flex flex-col justify-center items-center">
                                    <div className="p-1">
                                        <Card className="relative">
                                            <button
                                                className="absolute top-0 right-0 w-8 h-8 rounded-full bg-red-800"
                                                onClick={() => onClickAction(file?.id)}>dele</button>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <img className="h-full w-full" src={file.img} />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />

                    </Carousel>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
