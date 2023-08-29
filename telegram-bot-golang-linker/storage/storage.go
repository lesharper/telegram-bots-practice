package storage

import (
	"crypto/sha1"
	"errors"
	"fmt"
	"io"

	"telegram-bot-golang-linker/lib/e"
)

type Storage interface {
	Save(p *Page) error
	PickRandom(userName string) (*Page, error)
	Remove(p *Page) error
	IsExists(p *Page) (bool, error)
}

var ErrNoSavedPages = errors.New("no saved pages")

type Page struct {
	URL      string
	UserName string
}

func (p Page) Hash() (string, error) {
	errMsg := "Can't calculate hash"
	h := sha1.New()

	if _, err := io.WriteString(h, p.URL); err != nil {
		return "", e.Wrap(errMsg, err)
	}

	if _, err := io.WriteString(h, p.URL); err != nil {
		return "", e.Wrap(errMsg, err)
	}

	return fmt.Sprintf("%x", h.Sum(nil)), nil
}
