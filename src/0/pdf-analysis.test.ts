import { PdfAnalysis, type ChapterAnalysis } from './pdf-analysis';
import { getCompletePdfAnalysisData } from './pdf-complete-data';

describe('PdfAnalysis', () => {
  let pdfAnalysis: PdfAnalysis;
  let testData: ChapterAnalysis[];

  beforeEach(() => {
    testData = getCompletePdfAnalysisData();
    pdfAnalysis = new PdfAnalysis(testData);
  });

  describe('constructor', () => {
    it('should initialize with analysis data', () => {
      expect(pdfAnalysis).toBeInstanceOf(PdfAnalysis);
    });
  });

  describe('getTotalChapters', () => {
    it('should return the total number of chapters', () => {
      const total = pdfAnalysis.getTotalChapters();
      expect(total).toBeGreaterThan(0);
      expect(typeof total).toBe('number');
    });
  });

  describe('getChapterByIndex', () => {
    it('should return chapter by valid index', () => {
      const chapter = pdfAnalysis.getChapterByIndex(0);
      expect(chapter).toBeDefined();
      expect(chapter?.chapter).toContain('Chapter_1_THE_SPIRIT.pdf');
    });

    it('should return null for invalid index', () => {
      const chapter = pdfAnalysis.getChapterByIndex(999);
      expect(chapter).toBeNull();
    });
  });

  describe('getChapterByName', () => {
    it('should find chapter by name', () => {
      const chapter = pdfAnalysis.getChapterByName('SPIRIT');
      expect(chapter).toBeDefined();
      expect(chapter?.chapter).toContain('SPIRIT');
    });

    it('should return null for non-existent chapter', () => {
      const chapter = pdfAnalysis.getChapterByName('NON_EXISTENT');
      expect(chapter).toBeNull();
    });
  });

  describe('getAllConcepts', () => {
    it('should return all concepts with counts', () => {
      const concepts = pdfAnalysis.getAllConcepts();
      expect(concepts).toBeInstanceOf(Array);
      expect(concepts.length).toBeGreaterThan(0);
      
      concepts.forEach((concept => {
        expect(concept).toHaveProperty('concept');
        expect(concept).toHaveProperty('count');
        expect(typeof concept.concept).toBe('string');
        expect(typeof concept.count).toBe('number');
      }));
    });

    it('should sort concepts by count in descending order', () => {
      const concepts = pdfAnalysis.getAllConcepts();
      for (let i = 1; i < concepts.length; i++) {
        expect(concepts[i - 1].count).toBeGreaterThanOrEqual(concepts[i].count);
      }
    });
  });

  describe('getMostFrequentConcepts', () => {
    it('should return specified number of most frequent concepts', () => {
      const concepts = pdfAnalysis.getMostFrequentConcepts(5);
      expect(concepts).toHaveLength(5);
    });

    it('should return default 10 concepts when no limit specified', () => {
      const concepts = pdfAnalysis.getMostFrequentConcepts();
      expect(concepts).toHaveLength(10);
    });
  });

  describe('getConceptsByFrequency', () => {
    it('should return concepts with minimum count', () => {
      const concepts = pdfAnalysis.getConceptsByFrequency(5);
      concepts.forEach((concept => {
        expect(concept.count).toBeGreaterThanOrEqual(5);
      }));
    });
  });

  describe('searchKeyPassages', () => {
    it('should find passages containing search term', () => {
      const passages = pdfAnalysis.searchKeyPassages('vortex');
      expect(passages).toBeInstanceOf(Array);
      passages.forEach((passage => {
        expect(passage.toLowerCase()).toContain('vortex');
      }));
    });

    it('should return empty array for non-existent term', () => {
      const passages = pdfAnalysis.searchKeyPassages('NON_EXISTENT_TERM');
      expect(passages).toHaveLength(0);
    });
  });

  describe('getChaptersWithConcept', () => {
    it('should return chapters containing specified concept', () => {
      const chapters = pdfAnalysis.getChaptersWithConcept('torus');
      expect(chapters).toBeInstanceOf(Array);
      chapters.forEach((chapter => {
        const hasConcept = chapter.relatedConcepts.some((concept => 
          concept.concept.toLowerCase().includes('torus')
        ));
        expect(hasConcept).toBe(true);
      }));
    });
  });

  describe('getAnalysisSummary', () => {
    it('should return complete analysis summary', () => {
      const summary = pdfAnalysis.getAnalysisSummary();
      expect(summary).toHaveProperty('chapters');
      expect(summary).toHaveProperty('totalChapters');
      expect(summary).toHaveProperty('totalConcepts');
      expect(summary).toHaveProperty('mostFrequentConcepts');
      
      expect(summary.totalChapters).toBeGreaterThan(0);
      expect(summary.totalConcepts).toBeGreaterThan(0);
      expect(summary.mostFrequentConcepts).toBeInstanceOf(Array);
    });
  });

  describe('getChapterTitles', () => {
    it('should return all chapter titles', () => {
      const titles = pdfAnalysis.getChapterTitles();
      expect(titles).toBeInstanceOf(Array);
      expect(titles.length).toBe(pdfAnalysis.getTotalChapters());
      
      titles.forEach((title => {
        expect(typeof title).toBe('string');
        expect(title).toContain('Chapter_');
      }));
    });
  });

  describe('getConceptsByChapter', () => {
    it('should return concepts for valid chapter index', () => {
      const concepts = pdfAnalysis.getConceptsByChapter(0);
      expect(concepts).toBeInstanceOf(Array);
      expect(concepts.length).toBeGreaterThan(0);
    });

    it('should return empty array for invalid chapter index', () => {
      const concepts = pdfAnalysis.getConceptsByChapter(999);
      expect(concepts).toHaveLength(0);
    });
  });

  describe('getKeyPassagesByChapter', () => {
    it('should return key passages for valid chapter index', () => {
      const passages = pdfAnalysis.getKeyPassagesByChapter(0);
      expect(passages).toBeInstanceOf(Array);
      expect(passages.length).toBeGreaterThan(0);
    });

    it('should return empty array for invalid chapter index', () => {
      const passages = pdfAnalysis.getKeyPassagesByChapter(999);
      expect(passages).toHaveLength(0);
    });
  });
}); 