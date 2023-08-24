package events

type Fetcher interface {
	Fetch(limit, offset int) ([]Event, error)
}

type Processor interface {
	Process(e Event) error
}

type Type int

const (
	unknown Type = iota
	message
)

type Event struct {
	Type Type
	Text string
}
