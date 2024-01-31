
import { Card, CardContent } from "@uidu/card-ui"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@uidu/carousel-ui"
import { Dialog, DialogContent, DialogPortal, DialogTrigger } from "@uidu/dialog-ui"
import { useCallback } from "react"

interface MediaCardProps {
    files: object[]
    onClickAction?: (id: string) => void
}

export function MediaCard({
    files,
    onClickAction
}: MediaCardProps) {


    const handleSubmit = useCallback(
        ({ id }: { id: string }) => {
            if (onClickAction) {
                onClickAction(id);
            }
        },
        []
    );

    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex overflow-x-auto overflow-y-hidden -webkit-overflow-scrolling-touch whitespace-nowrap pb-4 pt-4 mt-[-1rem] mb-[-1rem]">
                    {files.map((file, idx) => (
                        <Card>
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
                        <CarouselContent>
                            {files.map((file, idx) => (
                                <CarouselItem key={idx}>
                                    <div className="p-1 relative">
                                        <Card>
                                            <button
                                                className="absolute top-0 right-0"
                                                onClick={() => handleSubmit({ id: file?.id + 1 })}>dele</button>
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
